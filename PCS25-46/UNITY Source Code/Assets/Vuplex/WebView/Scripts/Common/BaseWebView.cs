/**
* Copyright (c) 2021 Vuplex Inc. All rights reserved.
*
* Licensed under the Vuplex Commercial Software Library License, you may
* not use this file except in compliance with the License. You may obtain
* a copy of the License at
*
*     https://vuplex.com/commercial-library-license
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
// Only define BaseWebView.cs on supported platforms to avoid IL2CPP linking
// errors on unsupported platforms.
#if UNITY_EDITOR || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX || UNITY_ANDROID || (UNITY_IOS && !VUPLEX_OMIT_IOS) || UNITY_WEBGL || UNITY_WSA
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using UnityEngine;
using Vuplex.WebView.Internal;

#if NET_4_6 || NET_STANDARD_2_0
    using System.Threading.Tasks;
#endif

namespace Vuplex.WebView {
    /// <summary>
    /// The base `IWebView` implementation, which is extended for each platform.
    /// </summary>
    public abstract class BaseWebView : MonoBehaviour {

        public event EventHandler CloseRequested;

        public event EventHandler<ConsoleMessageEventArgs> ConsoleMessageLogged {
            add {
                _consoleMessageLogged += value;
                if (_consoleMessageLogged != null && _consoleMessageLogged.GetInvocationList().Length == 1) {
                    _setConsoleMessageEventsEnabled(true);
                }
            }
            remove {
                _consoleMessageLogged -= value;
                if (_consoleMessageLogged == null) {
                    _setConsoleMessageEventsEnabled(false);
                }
            }
        }

        public event EventHandler<FocusedInputFieldChangedEventArgs> FocusedInputFieldChanged {
            add {
                _focusedInputFieldChanged += value;
                if (_focusedInputFieldChanged != null && _focusedInputFieldChanged.GetInvocationList().Length == 1) {
                    _setFocusedInputFieldEventsEnabled(true);
                }
            }
            remove {
                _focusedInputFieldChanged -= value;
                if (_focusedInputFieldChanged == null) {
                    _setFocusedInputFieldEventsEnabled(false);
                }
            }
        }

        public event EventHandler<ProgressChangedEventArgs> LoadProgressChanged;

        public event EventHandler<EventArgs<string>> MessageEmitted;

        public event EventHandler PageLoadFailed;

        public event EventHandler<EventArgs<string>> TitleChanged;

        public event EventHandler<UrlChangedEventArgs> UrlChanged;

        public event EventHandler<EventArgs<Rect>> VideoRectChanged;

        public bool IsDisposed { get; protected set; }

        public bool IsInitialized { get; private set; }

        public List<string> PageLoadScripts { get; } = new List<string>();

        public float Resolution {
            get {
                return _numberOfPixelsPerUnityUnit;
            }
        }

        public Vector2 Size {
            get {
                return new Vector2(_width, _height);
            }
        }

        public virtual Vector2 SizeInPixels {
            get {
                return new Vector2(_nativeWidth, _nativeHeight);
            }
        }

        public Texture2D Texture {
            get {
                return _viewportTexture;
            }
        }

        public string Title { get; private set; }

        public string Url { get; private set; }

        public Texture2D VideoTexture {
            get {
                return _videoTexture;
            }
        }

        // Note: IWebView.Blur() is deprecated.
        public void Blur() {

            SetFocused(false);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        public Task<bool> CanGoBack() {

            var task = new TaskCompletionSource<bool>();
            CanGoBack(task.SetResult);
            return task.Task;
        }

        public Task<bool> CanGoForward() {

            var task = new TaskCompletionSource<bool>();
            CanGoForward(task.SetResult);
            return task.Task;
        }
    #endif

        public virtual void CanGoBack(Action<bool> callback) {

            _assertValidState();
            _pendingCanGoBackCallbacks.Add(callback);
            WebView_canGoBack(_nativeWebViewPtr);
        }

        public virtual void CanGoForward(Action<bool> callback) {

            _assertValidState();
            _pendingCanGoForwardCallbacks.Add(callback);
            WebView_canGoForward(_nativeWebViewPtr);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        public Task<byte[]> CaptureScreenshot() {

            var task = new TaskCompletionSource<byte[]>();
            CaptureScreenshot(task.SetResult);
            return task.Task;
        }
    #endif

        public virtual void CaptureScreenshot(Action<byte[]> callback) {

            var bytes = new byte[0];
            try {
                var texture = _getReadableTexture();
                bytes = ImageConversion.EncodeToPNG(texture);
                Destroy(texture);
            } catch (Exception e) {
                WebViewLogger.LogError("An exception occurred while capturing the screenshot: " + e);
            }
            callback(bytes);
        }

        public virtual void Click(Vector2 point) {

            _assertValidState();
            int nativeX = (int) (point.x * _nativeWidth);
            int nativeY = (int) (point.y * _nativeHeight);
            WebView_click(_nativeWebViewPtr, nativeX, nativeY);
        }

        public virtual void Click(Vector2 point, bool preventStealingFocus) {

            // On most platforms, the regular `Click()` method
            // doesn't steal focus.
            Click(point);
        }

        public virtual void Copy() {

            _assertValidState();
            _getSelectedText(text => GUIUtility.systemCopyBuffer = text);
        }

        public virtual void Cut() {

            _assertValidState();
            _getSelectedText(text => {
                GUIUtility.systemCopyBuffer = text;
                HandleKeyboardInput("Backspace");
            });
        }

        // Note: IWebView.DisableViewUpdates() is deprecated.
        public void DisableViewUpdates() {

            SetRenderingEnabled(false);
        }

        public virtual void Dispose() {

            _assertValidState();
            IsDisposed = true;
            WebView_destroy(_nativeWebViewPtr);
            _nativeWebViewPtr = IntPtr.Zero;
            // To avoid a MissingReferenceException, verify that this script
            // hasn't already been destroyed prior to accessing gameObject.
            if (this != null) {
                Destroy(gameObject);
            }
        }

        // Note: IWebView.DisableViewUpdates() is deprecated.
        public void EnableViewUpdates() {

            SetRenderingEnabled(true);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        public Task<string> ExecuteJavaScript(string javaScript) {

            var task = new TaskCompletionSource<string>();
            ExecuteJavaScript(javaScript, task.SetResult);
            return task.Task;
        }
    #else
        public void ExecuteJavaScript(string javaScript) {

            ExecuteJavaScript(javaScript, null);
        }
    #endif

        public virtual void ExecuteJavaScript(string javaScript, Action<string> callback) {

            _assertValidState();
            string resultCallbackId = null;
            if (callback != null) {
                resultCallbackId = Guid.NewGuid().ToString();
                _pendingJavaScriptResultCallbacks[resultCallbackId] = callback;
            }
            WebView_executeJavaScript(_nativeWebViewPtr, javaScript, resultCallbackId);
        }

        // Note: IWebView.Focus() is deprecated.
        public void Focus() {

            SetFocused(true);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        public Task<byte[]> GetRawTextureData() {

            var task = new TaskCompletionSource<byte[]>();
            GetRawTextureData(task.SetResult);
            return task.Task;
        }
    #endif

        public virtual void GetRawTextureData(Action<byte[]> callback) {

            var bytes = new byte[0];
            try {
                var texture = _getReadableTexture();
                bytes = texture.GetRawTextureData();
                Destroy(texture);
            } catch (Exception e) {
                WebViewLogger.LogError("An exception occurred while getting the raw texture data: " + e);
            }
            callback(bytes);
        }

        public virtual void GoBack() {

            _assertValidState();
            WebView_goBack(_nativeWebViewPtr);
        }

        public virtual void GoForward() {

            _assertValidState();
            WebView_goForward(_nativeWebViewPtr);
        }

        public virtual void HandleKeyboardInput(string key) {

            _assertValidState();
            WebView_handleKeyboardInput(_nativeWebViewPtr, key);
        }

        public void Init(Texture2D texture, float width, float height) {

            Init(texture, width, height, null);
        }

        public virtual void Init(Texture2D viewportTexture, float width, float height, Texture2D videoTexture) {

            if (IsInitialized) {
                throw new InvalidOperationException("Init() cannot be called on a webview that has already been initialized.");
            }
            _viewportTexture = viewportTexture;
            _videoTexture = videoTexture;
            // Assign the game object a unique name so that the native view can send it messages.
            gameObject.name = String.Format("WebView-{0}", Guid.NewGuid().ToString());
            _width = width;
            _height = height;
            VXUtils.ThrowExceptionIfAbnormallyLarge(_nativeWidth, _nativeHeight);
            IsInitialized = true;
            // Prevent the script from automatically being destroyed when a new scene is loaded.
            DontDestroyOnLoad(gameObject);
        }

        public virtual void LoadHtml(string html) {

            _assertValidState();
            WebView_loadHtml(_nativeWebViewPtr, html);
        }

        public virtual void LoadUrl(string url) {

            _assertValidState();
            WebView_loadUrl(_nativeWebViewPtr, _transformUrlIfNeeded(url));
        }

        public virtual void LoadUrl(string url, Dictionary<string, string> additionalHttpHeaders) {

            _assertValidState();
            if (additionalHttpHeaders == null) {
                LoadUrl(url);
            } else {
                var headerStrings = additionalHttpHeaders.Keys.Select(key => String.Format("{0}: {1}", key, additionalHttpHeaders[key])).ToArray();
                var newlineDelimitedHttpHeaders = String.Join("\n", headerStrings);
                WebView_loadUrlWithHeaders(_nativeWebViewPtr, url, newlineDelimitedHttpHeaders);
            }
        }

        public virtual void Paste() {

            _assertValidState();
            var text = GUIUtility.systemCopyBuffer;
            foreach (var character in text) {
                HandleKeyboardInput(char.ToString(character));
            }
        }

        public virtual void PostMessage(string message) {

            var escapedString = message.Replace("'", "\\'").Replace("\n", "\\n");
            ExecuteJavaScript(String.Format("vuplex._emit('message', {{ data: \'{0}\' }})", escapedString));
        }

        public virtual void Reload() {

            _assertValidState();
            WebView_reload(_nativeWebViewPtr);
        }

        public virtual void Resize(float width, float height) {

            if (IsDisposed || (width == _width && height == _height)) {
                return;
            }
            _width = width;
            _height = height;
            _resize();
        }

        public virtual void Scroll(Vector2 delta) {

            _assertValidState();
            var deltaX = (int)(delta.x * _numberOfPixelsPerUnityUnit);
            var deltaY = (int)(delta.y * _numberOfPixelsPerUnityUnit);
            WebView_scroll(_nativeWebViewPtr, deltaX, deltaY);
        }

        public virtual void Scroll(Vector2 scrollDelta, Vector2 point) {

            _assertValidState();
            var deltaX = (int)(scrollDelta.x * _numberOfPixelsPerUnityUnit);
            var deltaY = (int)(scrollDelta.y * _numberOfPixelsPerUnityUnit);
            var pointerX = (int)(point.x * _nativeWidth);
            var pointerY = (int)(point.y * _nativeHeight);
            WebView_scrollAtPoint(_nativeWebViewPtr, deltaX, deltaY, pointerX, pointerY);
        }

        public virtual void SelectAll() {

            _assertValidState();
            // If the focused element is an input with a select() method, then use that.
            // Otherwise, travel up the DOM until we get to the body or a contenteditable
            // element, and then select its contents.
            ExecuteJavaScript(
                @"(function() {
                    var element = document.activeElement || document.body;
                    while (!(element === document.body || element.getAttribute('contenteditable') === 'true')) {
                        if (typeof element.select === 'function') {
                            element.select();
                            return;
                        }
                        element = element.parentElement;
                    }
                    var range = document.createRange();
                    range.selectNodeContents(element);
                    var selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                })();",
                null
            );
        }

        public virtual void SetFocused(bool focused) {

            _assertValidState();
            WebView_setFocused(_nativeWebViewPtr, focused);
        }

        public virtual void SetRenderingEnabled(bool enabled) {

            _assertValidState();
            WebView_setRenderingEnabled(_nativeWebViewPtr, enabled);
            _renderingEnabled = enabled;
            if (enabled && _currentViewportNativeTexture != IntPtr.Zero) {
                _viewportTexture.UpdateExternalTexture(_currentViewportNativeTexture);
            }
        }

        public virtual void SetResolution(float pixelsPerUnityUnit) {

            _numberOfPixelsPerUnityUnit = pixelsPerUnityUnit;
            _resize();
        }

        public virtual void ZoomIn() {

            _assertValidState();
            WebView_zoomIn(_nativeWebViewPtr);
        }

        public virtual void ZoomOut() {

            _assertValidState();
            WebView_zoomOut(_nativeWebViewPtr);
        }

        EventHandler<ConsoleMessageEventArgs> _consoleMessageLogged;
        protected IntPtr _currentViewportNativeTexture;

    #if (UNITY_STANDALONE_WIN && !UNITY_EDITOR) || UNITY_EDITOR_WIN
        protected const string _dllName = "VuplexWebViewWindows";
    #elif (UNITY_STANDALONE_OSX && !UNITY_EDITOR) || UNITY_EDITOR_OSX
        protected const string _dllName = "VuplexWebViewMac";
    #elif UNITY_WSA
        protected const string _dllName = "VuplexWebViewUwp";
    #elif UNITY_ANDROID
        protected const string _dllName = "VuplexWebViewAndroid";
    #else
        protected const string _dllName = "__Internal";
    #endif

        EventHandler<FocusedInputFieldChangedEventArgs> _focusedInputFieldChanged;
        protected float _height; // in Unity units
        Material _materialForBlitting;
        // Height in pixels.
        protected int _nativeHeight {
            get {
                // Height must be non-zero
                return Math.Max(1, (int)(_height * _numberOfPixelsPerUnityUnit));
            }
        }
        protected IntPtr _nativeWebViewPtr = IntPtr.Zero;
        // Width in pixels.
        protected int _nativeWidth {
            get {
                // Width must be non-zero
                return Math.Max(1, (int)(_width * _numberOfPixelsPerUnityUnit));
            }
        }
        protected float _numberOfPixelsPerUnityUnit = Config.NumberOfPixelsPerUnityUnit;
        List<Action<bool>> _pendingCanGoBackCallbacks = new List<Action<bool>>();
        List<Action<bool>> _pendingCanGoForwardCallbacks = new List<Action<bool>>();
        protected Dictionary<string, Action<string>> _pendingJavaScriptResultCallbacks = new Dictionary<string, Action<string>>();
        protected bool _renderingEnabled = true;
        static readonly Regex _streamingAssetsUrlRegex = new Regex(@"^streaming-assets:(//)?(.*)$", RegexOptions.IgnoreCase);
        Rect _videoRect = Rect.zero;
        protected Texture2D _videoTexture;
        protected Texture2D _viewportTexture;
        protected float _width; // in Unity units

        protected void _assertValidState(){

            if (!IsInitialized) {
                throw new InvalidOperationException("Methods cannot be called on an uninitialized webview. Please initialize it first with IWebView.Init().");
            }
            if (IsDisposed) {
                throw new InvalidOperationException("Methods cannot be called on a disposed webview.");
            }
        }

        protected virtual Material _createMaterialForBlitting() {

            return VXUtils.CreateDefaultMaterial();
        }

        Texture2D _getReadableTexture() {

            // https://support.unity3d.com/hc/en-us/articles/206486626-How-can-I-get-pixels-from-unreadable-textures-
            RenderTexture tempRenderTexture = RenderTexture.GetTemporary(
                _nativeWidth,
                _nativeHeight,
                0,
                RenderTextureFormat.Default,
                RenderTextureReadWrite.Linear
            );
            RenderTexture previousRenderTexture = RenderTexture.active;
            RenderTexture.active = tempRenderTexture;
            // Explicitly clear the temporary render texture, otherwise it can contain
            // existing content that won't be overwritten by transparent pixels.
            GL.Clear(true, true, Color.clear);
            // Use the version of Graphics.Blit() that accepts a material
            // so that any transformations needed are performed with the shader.
            if (_materialForBlitting == null) {
                _materialForBlitting = _createMaterialForBlitting();
            }
            Graphics.Blit(Texture, tempRenderTexture, _materialForBlitting);
            Texture2D readableTexture = new Texture2D(_nativeWidth, _nativeHeight);
            readableTexture.ReadPixels(new Rect(0, 0, tempRenderTexture.width, tempRenderTexture.height), 0, 0);
            readableTexture.Apply();
            RenderTexture.active = previousRenderTexture;
            RenderTexture.ReleaseTemporary(tempRenderTexture);
            return readableTexture;
        }

        void _getSelectedText(Action<string> callback) {

            // window.getSelection() doesn't work on the content of <textarea> and <input> elements in
            // Gecko and legacy Edge.
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection#Related_objects
            ExecuteJavaScript(
                @"var element = document.activeElement;
                if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                    element.value.substring(element.selectionStart, element.selectionEnd);
                } else {
                    window.getSelection().toString();
                }",
                callback
            );
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleCanGoBackResult(string message) {

            var result = Boolean.Parse(message);
            var callbacks = new List<Action<bool>>(_pendingCanGoBackCallbacks);
            _pendingCanGoBackCallbacks.Clear();
            foreach (var callback in callbacks) {
                try {
                    callback(result);
                } catch (Exception e) {
                    WebViewLogger.LogError("An exception occurred while calling the callback for CanGoBack: " + e);
                }
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleCanGoForwardResult(string message) {

            var result = Boolean.Parse(message);
            var callBacks = new List<Action<bool>>(_pendingCanGoForwardCallbacks);
            _pendingCanGoForwardCallbacks.Clear();
            foreach (var callBack in callBacks) {
                try {
                    callBack(result);
                } catch (Exception e) {
                    WebViewLogger.LogError("An exception occurred while calling the callForward for CanGoForward: " + e);
                }
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleCloseRequested(string message) {

            var handler = CloseRequested;
            if (handler != null) {
                CloseRequested(this, EventArgs.Empty);
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleJavaScriptResult(string message) {

            var components = message.Split(new char[] { ',' }, 2);
            var resultCallbackId = components[0];
            var result = components[1];
            _handleJavaScriptResult(resultCallbackId, result);
        }

        void _handleJavaScriptResult(string resultCallbackId, string result) {

            var callback = _pendingJavaScriptResultCallbacks[resultCallbackId];
            _pendingJavaScriptResultCallbacks.Remove(resultCallbackId);
            callback(result);
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleLoadFailed(string unusedParam) {

            if (PageLoadFailed != null) {
                PageLoadFailed(this, EventArgs.Empty);
            }
            OnLoadProgressChanged(new ProgressChangedEventArgs(ProgressChangeType.Failed, 1.0f));
            if (PageLoadFailed == null && LoadProgressChanged == null) {
                // No handlers are attached to PageLoadFailed or LoadProgressChanged,
                // so log a warning about the page load failure.
                WebViewLogger.LogWarning("A web page failed to load. This can happen if the URL loaded is invalid or if the device has no network connection. To detect and handle page load failures like this, applications can use the IWebView.LoadProgressChanged event or the IWebView.PageLoadFailed event.");
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleLoadFinished(string unusedParam) {

            var e = new ProgressChangedEventArgs(ProgressChangeType.Finished, 1.0f);
            OnLoadProgressChanged(e);
            foreach (var script in PageLoadScripts) {
                ExecuteJavaScript(script, null);
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleLoadStarted(string unusedParam) {

            var e = new ProgressChangedEventArgs(ProgressChangeType.Started, 0.0f);
            OnLoadProgressChanged(e);
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleLoadProgressUpdate(string progressString) {

            var progress = float.Parse(progressString, CultureInfo.InvariantCulture);
            var e = new ProgressChangedEventArgs(ProgressChangeType.Updated, progress);
            OnLoadProgressChanged(e);
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleMessageEmitted(string serializedMessage) {

            // For performance, only try to deserialize the message if it's one we're listening for.
            var messageType = serializedMessage.Contains("vuplex.webview") ? BridgeMessage.ParseType(serializedMessage) : null;
            switch (messageType) {
                case "vuplex.webview.consoleMessageLogged": {
                    var handler = _consoleMessageLogged;
                    if (handler != null) {
                        var consoleMessage = JsonUtility.FromJson<ConsoleBridgeMessage>(serializedMessage);
                        handler(this, consoleMessage.ToEventArgs());
                    }
                    break;
                }
                case "vuplex.webview.focusedInputFieldChanged": {
                    var typeString = StringBridgeMessage.ParseValue(serializedMessage);
                    var type = FocusedInputFieldChangedEventArgs.ParseType(typeString);
                    var handler = _focusedInputFieldChanged;
                    if (handler != null) {
                        handler(this, new FocusedInputFieldChangedEventArgs(type));
                    }
                    break;
                }
                case "vuplex.webview.javaScriptResult": {
                    var message = JsonUtility.FromJson<StringWithIdBridgeMessage>(serializedMessage);
                    _handleJavaScriptResult(message.id, message.value);
                    break;
                }
                case "vuplex.webview.titleChanged": {
                    Title = StringBridgeMessage.ParseValue(serializedMessage);
                    var handler = TitleChanged;
                    if (handler != null) {
                        handler(this, new EventArgs<string>(Title));
                    }
                    break;
                }
                case "vuplex.webview.urlChanged": {
                    var action = JsonUtility.FromJson<UrlChangedMessage>(serializedMessage).urlAction;
                    if (Url == action.Url) {
                        return;
                    }
                    Url = action.Url;
                    var handler = UrlChanged;
                    if (handler != null) {
                        handler(this, new UrlChangedEventArgs(action.Url, action.Type));
                    }
                    break;
                }
                case "vuplex.webview.videoRectChanged": {
                    var value = JsonUtility.FromJson<VideoRectChangedMessage>(serializedMessage).value;
                    var newRect = value.rect.toRect();
                    if (_videoRect != newRect) {
                        _videoRect = newRect;
                        var handler = VideoRectChanged;
                        if (handler != null) {
                            handler(this, new EventArgs<Rect>(newRect));
                        }
                    }
                    break;
                }
                default: {
                    var handler = MessageEmitted;
                    if (handler != null) {
                        handler(this, new EventArgs<string>(serializedMessage));
                    }
                    break;
                }
            }
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleTextureChanged(string textureString) {

            var nativeTexture = new IntPtr(Int64.Parse(textureString));
            if (nativeTexture == _currentViewportNativeTexture) {
                return;
            }
            var previousNativeTexture = _currentViewportNativeTexture;
            _currentViewportNativeTexture = nativeTexture;
            if (_renderingEnabled) {
                _viewportTexture.UpdateExternalTexture(_currentViewportNativeTexture);
            }
            if (previousNativeTexture != IntPtr.Zero && previousNativeTexture != _currentViewportNativeTexture) {
                WebView_destroyTexture(previousNativeTexture, SystemInfo.graphicsDeviceType.ToString());
            }
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void _logDeprecationWarningIfNeeded() {

            #if !(NET_4_6 || NET_STANDARD_2_0)
                WebViewLogger.LogWarning("Support for the legacy .NET 3.5 runtime is now deprecated and will be removed in a future 3D WebView v4.0 release. Please switch to the .NET 4.x runtime.");
            #endif
        }

        protected virtual void OnLoadProgressChanged(ProgressChangedEventArgs eventArgs) {

            var handler = LoadProgressChanged;
            if (handler != null) {
                handler(this, eventArgs);
            }
        }

        protected ConsoleMessageLevel _parseConsoleMessageLevel(string levelString) {

            switch (levelString) {
                case "DEBUG":
                    return ConsoleMessageLevel.Debug;
                case "ERROR":
                    return ConsoleMessageLevel.Error;
                case "LOG":
                    return ConsoleMessageLevel.Log;
                case "WARNING":
                    return ConsoleMessageLevel.Warning;
                default:
                    WebViewLogger.LogWarning("Unrecognized console message level: " + levelString);
                    return ConsoleMessageLevel.Log;
            }
        }

        protected virtual void _resize() {

            // Only trigger a resize if the webview has been initialized
            if (_viewportTexture) {
                _assertValidState();
                VXUtils.ThrowExceptionIfAbnormallyLarge(_nativeWidth, _nativeHeight);
                WebView_resize(_nativeWebViewPtr, _nativeWidth, _nativeHeight);
            }
        }

        protected virtual void _setConsoleMessageEventsEnabled(bool enabled) {

            _assertValidState();
            WebView_setConsoleMessageEventsEnabled(_nativeWebViewPtr, enabled);
        }

        protected virtual void _setFocusedInputFieldEventsEnabled(bool enabled) {

            _assertValidState();
            WebView_setFocusedInputFieldEventsEnabled(_nativeWebViewPtr, enabled);
        }

        protected string _transformUrlIfNeeded(string originalUrl) {

            if (originalUrl == null) {
                throw new ArgumentException("URL cannot be null.");
            }
            // Default to https:// if no protocol is specified.
            if (!originalUrl.Contains(":")) {
                if (!originalUrl.Contains(".")) {
                    // The URL doesn't include a valid domain, so throw instead of defaulting to https://.
                    throw new ArgumentException("Invalid URL: " + originalUrl);
                }
                var updatedUrl = "https://" + originalUrl;
                WebViewLogger.LogWarningFormat("The provided URL is missing a protocol (e.g. http://, https://), so it will default to https://. Original URL: {0}, Updated URL: {1}", originalUrl, updatedUrl);
                return updatedUrl;
            }
            // If a streaming-assets:// URL was specified, so transform it to a URL that the browser can load.
            var streamingAssetsRegexMatch = _streamingAssetsUrlRegex.Match(originalUrl);
            if (streamingAssetsRegexMatch.Success) {
                var urlPath = streamingAssetsRegexMatch.Groups[2].Captures[0].Value;
                // If Application.streamingAssetsPath doesn't already contain a URL protocol, then add
                // the file:// protocol. It already has a protocol in the case of WebGL (http(s)://)
                // and Android (jar:file://).
                var urlProtocolToAdd = Application.streamingAssetsPath.Contains("://") ? "" : "file://";
                // Spaces in URLs must be escaped
                var streamingAssetsUrl = urlProtocolToAdd + Path.Combine(Application.streamingAssetsPath, urlPath).Replace(" ", "%20");
                return streamingAssetsUrl;
            }
            return originalUrl;
        }

        [DllImport(_dllName)]
        static extern void WebView_canGoBack(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_canGoForward(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_click(IntPtr webViewPtr, int x, int y);

        [DllImport(_dllName)]
        protected static extern void WebView_destroyTexture(IntPtr texture, string graphicsApi);

        [DllImport(_dllName)]
        static extern void WebView_destroy(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_executeJavaScript(IntPtr webViewPtr, string javaScript, string resultCallbackId);

        [DllImport(_dllName)]
        static extern void WebView_goBack(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_goForward(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_handleKeyboardInput(IntPtr webViewPtr, string input);

        [DllImport(_dllName)]
        static extern void WebView_loadHtml(IntPtr webViewPtr, string html);

        [DllImport(_dllName)]
        static extern void WebView_loadUrl(IntPtr webViewPtr, string url);

        [DllImport(_dllName)]
        static extern void WebView_loadUrlWithHeaders(IntPtr webViewPtr, string url, string newlineDelimitedHttpHeaders);

        [DllImport(_dllName)]
        static extern void WebView_reload(IntPtr webViewPtr);

        [DllImport(_dllName)]
        protected static extern void WebView_resize(IntPtr webViewPtr, int width, int height);

        [DllImport(_dllName)]
        static extern void WebView_scroll(IntPtr webViewPtr, int deltaX, int deltaY);

        [DllImport(_dllName)]
        static extern void WebView_scrollAtPoint(IntPtr webViewPtr, int deltaX, int deltaY, int pointerX, int pointerY);

        [DllImport(_dllName)]
        static extern void WebView_setConsoleMessageEventsEnabled(IntPtr webViewPtr, bool enabled);

        [DllImport(_dllName)]
        static extern void WebView_setFocused(IntPtr webViewPtr, bool focused);

        [DllImport(_dllName)]
        static extern void WebView_setFocusedInputFieldEventsEnabled(IntPtr webViewPtr, bool enabled);

        [DllImport(_dllName)]
        static extern void WebView_setRenderingEnabled(IntPtr webViewPtr, bool enabled);

        [DllImport(_dllName)]
        static extern void WebView_zoomIn(IntPtr webViewPtr);

        [DllImport(_dllName)]
        static extern void WebView_zoomOut(IntPtr webViewPtr);
    }
}
#endif
