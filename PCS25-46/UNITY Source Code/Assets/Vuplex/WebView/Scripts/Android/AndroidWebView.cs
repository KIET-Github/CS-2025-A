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
#if UNITY_ANDROID && !UNITY_EDITOR
#pragma warning disable CS0108
#pragma warning disable CS0067
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Rendering;
using Vuplex.WebView.Internal;

#if NET_4_6 || NET_STANDARD_2_0
    using System.Threading.Tasks;
#endif

namespace Vuplex.WebView {

    /// <summary>
    /// The IWebView implementation used by 3D WebView for Android.
    /// This class also includes extra methods for Android-specific functionality.
    /// </summary>
    public class AndroidWebView : BaseWebView,
                                  IWebView,
                                  IWithMovablePointer,
                                  IWithNative2DMode,
                                  IWithNativeOnScreenKeyboard,
                                  IWithPointerDownAndUp,
                                  IWithPopups,
                                  IWithSettableUserAgent {

        /// <seealso cref="IWithNative2DMode"/>
        public bool Native2DModeEnabled { get; private set; }

        public WebPluginType PluginType {
            get {
                return WebPluginType.Android;
            }
        }

        /// <seealso cref="IWithNative2DMode"/>
        public Rect Rect { get; private set; }

        /// <seealso cref="IWithNative2DMode"/>
        public bool Visible { get; private set; }

        /// <see cref="IWithPopups"/>
        public event EventHandler<PopupRequestedEventArgs> PopupRequested;

        /// <summary>
        /// Indicates that the browser's render process terminated, either because it
        /// crashed or because the operating system killed it.
        /// Note that this event only works in Android API level 26 and newer.
        /// </summary>
        /// <remarks>
        /// 3D WebView for Android internally uses the android.webkit.WebView system
        /// package as its browser engine. Android's documentation indicates that
        /// the browser's render process can terminate in some rare circumstances.
        /// This RenderProcessGone event indicates when that occurs so that the application
        /// can recover be destroying the existing webviews and creating new webviews.
        /// </remarks>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.RenderProcessGone += (sender, eventArgs) => {
        ///         Debug.Log("The browser process was terminated");
        ///     };
        /// #endif
        /// </code>
        /// </example>
        /// <seealso href="https://developer.android.com/reference/android/webkit/WebViewClient#onRenderProcessGone(android.webkit.WebView,%20android.webkit.RenderProcessGoneDetail)">
        /// android.webkit.WebViewClient.onRenderProcessGone()
        /// </seealso>
        /// <seealso href="https://developer.android.com/guide/webapps/managing-webview#termination-handle">
        /// Termination Handling API (Android docs)
        /// </seelso>
        public event EventHandler RenderProcessGone;

        [Obsolete("The ScriptAlert event has been renamed to ScriptAlerted. Please use ScriptAlerted instead.", true)]
        public event EventHandler<ScriptDialogEventArgs> ScriptAlert;

        /// <summary>
        /// Event raised when a script in the page calls window.alert().
        /// </summary>
        /// <remarks>
        /// If no handler is attached to this event, then `window.alert()` will return
        /// immediately and the script will continue execution. If a handler is attached to
        /// this event, then script execution will be paused until the event args' Continue()
        /// callback is called.
        /// </remarks>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.ScriptAlerted += (sender, eventArgs) => {
        ///         Debug.Log("Script alerted: " + eventArgs.Message);
        ///         eventArgs.Continue();
        ///     };
        /// #endif
        /// </code>
        /// </example>
        public event EventHandler<ScriptDialogEventArgs> ScriptAlerted {
            add {
                if (_scriptAlertHandler != null) {
                    throw new InvalidOperationException("ScriptAlerted supports only one event handler. Please remove the existing handler before adding a new one.");
                }
                _scriptAlertHandler = value;
                _webView.Call("setScriptAlertHandler", new AndroidStringAndBoolDelegateCallback(_handleScriptAlert));
            }
            remove {
                if (_scriptAlertHandler == value) {
                    _scriptAlertHandler = null;
                    _webView.Call("setScriptAlertHandler", null);
                }
            }
        }

        /// <summary>
        /// Event raised when a script in the page calls window.confirm().
        /// </summary>
        /// <remarks>
        /// If no handler is attached to this event, then `window.confirm()` will return
        /// `false` immediately and the script will continue execution. If a handler is attached to
        /// this event, then script execution will be paused until the event args' Continue() callback
        /// is called, and `window.confirm()` will return the value passed to `Continue()`.
        /// </remarks>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.ScriptConfirmRequested += (sender, eventArgs) => {
        ///         Debug.Log("Script confirm requested: " + eventArgs.Message);
        ///         eventArgs.Continue(true);
        ///     };
        /// #endif
        /// </code>
        /// </example>
        public event EventHandler<ScriptDialogEventArgs<bool>> ScriptConfirmRequested {
            add {
                if (_scriptConfirmHandler != null) {
                    throw new InvalidOperationException("ScriptConfirmRequested supports only one event handler. Please remove the existing handler before adding a new one.");
                }
                _scriptConfirmHandler = value;
                _webView.Call("setScriptConfirmHandler", new AndroidStringAndBoolDelegateCallback(_handleScriptConfirm));
            }
            remove {
                if (_scriptConfirmHandler == value) {
                    _scriptConfirmHandler = null;
                    _webView.Call("setScriptConfirmHandler", null);
                }
            }
        }

        internal static void AssertWebViewIsAvailable() {

            if (!IsWebViewAvailable()) {
                throw new WebViewUnavailableException("The Android WebView package is currently unavailable. This is rare but can occur if it's not installed on the system or is currently being updated.");
            }
        }

        public override void CanGoBack(Action<bool> callback) {

            _assertValidState();
            _webView.Call("canGoBack", new AndroidBoolCallback(callback));
        }

        public override void CanGoForward(Action<bool> callback) {

            _assertValidState();
            _webView.Call("canGoForward", new AndroidBoolCallback(callback));
        }

        /// <summary>
        /// Overrides BaseWebView.CaptureScreenshot() because it doesn't work
        /// with Android OES textures.
        /// </summary>
        public override void CaptureScreenshot(Action<byte[]> callback) {

            _assertValidState();
            _webView.Call("captureScreenshot", new AndroidByteArrayCallback(callback));
        }

        public static void ClearAllData() {

            _class.CallStatic("clearAllData");
        }

        /// <summary>
        /// Clears the webview's back / forward navigation history.
        /// </summary>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.ClearHistory();
        /// #endif
        /// </code>
        /// </example>
        public void ClearHistory() {

            _assertValidState();
            _webView.Call("clearHistory");
        }

        public override void Click(Vector2 point) {

            _assertValidState();
            var nativeX = (int)(point.x * _nativeWidth);
            var nativeY = (int)(point.y * _nativeHeight);
            _webView.Call("click", nativeX, nativeY);
        }

        public override void Dispose() {

            _assertValidState();
            // Cancel the render if it has been scheduled via GL.IssuePluginEvent().
            WebView_removePointer(_webView.GetRawObject());
            IsDisposed = true;
            _webView.Call("destroy");
            _webView.Dispose();
            Destroy(gameObject);
        }

        public override void ExecuteJavaScript(string javaScript, Action<string> callback) {

            _assertValidState();
            var nativeCallback = callback == null ? null : new AndroidStringCallback(callback);
            _webView.Call("executeJavaScript", javaScript, nativeCallback);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        /// <summary>
        /// Gets the cookie that matches the given URL and cookie name, or
        /// null if no cookie matches.
        /// </summary>
        /// <remarks>
        /// The Cookie returned by this method only includes a Name and Value,
        /// and the other fields such as ExpirationDate are not populated.
        /// This is because the method internally uses the CookieManager.getCookie()
        /// Android API, which only returns the cookie name and value.
        /// </remarks>
        public static Task<Cookie> GetCookie(string url, string cookieName) {

            var task = new TaskCompletionSource<Cookie>();
            GetCookie(url, cookieName, task.SetResult);
            return task.Task;
        }
    #endif

        /// <summary>
        /// Like the other version of GetCookie(), except it uses a callback
        /// instead of a Task in order to be compatible with legacy .NET.
        /// </summary>
        public static void GetCookie(string url, string cookieName, Action<Cookie> callback) {

            var nameAndValueString = _class.CallStatic<string>("getCookie", url, cookieName);
            Cookie cookie = null;
            if (nameAndValueString != null) {
                var nameAndValue = nameAndValueString.Split(new char[] {'='}, 2);
                cookie = new Cookie {
                    Name = nameAndValue[0],
                    Value = nameAndValue[1]
                };
            }
            callback(cookie);
        }

        public static string GetGraphicsApiErrorMessage(GraphicsDeviceType graphicsDeviceType) {

            var isValid = graphicsDeviceType == GraphicsDeviceType.OpenGLES3 || graphicsDeviceType == GraphicsDeviceType.OpenGLES2;
            if (isValid) {
                return null;
            }
            return String.Format("Unsupported graphics API: 3D WebView for Android requires OpenGLES3 or OpenGLES2, but the graphics API in use is {0}. Please go to Player Settings and set \"Graphics APIs\" to OpenGLES3 or OpenGLES2.", graphicsDeviceType);
        }

        /// <summary>
        /// Overrides BaseWebView.GetRawTextureData() because it's slow on Android.
        /// </summary>
        public override void GetRawTextureData(Action<byte[]> callback) {

            _assertValidState();
            _webView.Call("getRawTextureData", new AndroidByteArrayCallback(callback));
        }

        public static void GloballySetUserAgent(bool mobile) {

            _class.CallStatic("globallySetUserAgent", mobile);
        }

        public static void GloballySetUserAgent(string userAgent) {

            _class.CallStatic("globallySetUserAgent", userAgent);
        }

        [Obsolete("AndroidWebView.GloballyUseAlternativeInputEventSystem() has been removed. Please use AndroidWebView.SetAlternativePointerInputSystemEnabled() and/or SetAlternativeKeyboardInputSystemEnabled() instead.", true)]
        public static void GloballyUseAlternativeInputEventSystem(bool useAlternativeInputEventSystem) {}

        public override void GoBack() {

            _assertValidState();
            _webView.Call("goBack");
        }

        public override void GoForward() {

            _assertValidState();
            _webView.Call("goForward");
        }

        public override void HandleKeyboardInput(string input) {

            _assertValidState();
            _webView.Call("handleKeyboardInput", input);
        }

        public override void Init(Texture2D viewportTexture, float width, float height, Texture2D videoTexture) {

            AssertWebViewIsAvailable();
            _init(viewportTexture, width, height, videoTexture, null);
        }

        /// <seealso cref="IWithNative2DMode"/>
        public void InitInNative2DMode(Rect rect) {

            _numberOfPixelsPerUnityUnit = 1;
            Native2DModeEnabled = true;
            this.Rect = rect;
            Visible = true;
            base.Init(null, rect.width, rect.height, null);
            _webView = new AndroidJavaObject(
                _2dWebViewClassName,
                gameObject.name,
                (int)rect.x,
                (int)rect.y,
                (int)rect.width,
                (int)rect.height
            );
        }

        public static AndroidWebView Instantiate() {

            return (AndroidWebView) new GameObject().AddComponent<AndroidWebView>();
        }

        [Obsolete("AndroidWebView.IsUsingNativeVideoRendering() has been removed because native video is now supported on all devices.", true)]
        public static bool IsUsingNativeVideoRendering() { return true; }

        /// <summary>
        /// Indicates whether the Android WebView package is installed on the system and available.
        /// </summary>
        /// <remarks>
        /// 3D WebView internally depends on Android's WebView package, which is normally installed
        /// as part of the operating system. In rare circumstances, the Android WebView package may be unavailable.
        /// For example, this can happen if the user used developer tools to delete the WebView package
        /// or if [updates to the WebView package are currently being installed](https://bugs.chromium.org/p/chromium/issues/detail?id=506369) .
        /// </remarks>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     Debug.Log("WebView is available: " + AndroidWebView.IsWebViewAvailable())
        /// #endif
        /// </code>
        /// </example>
        public static bool IsWebViewAvailable() {

            if (_webViewPackageIsAvailable == null) {
                _webViewPackageIsAvailable = _class.CallStatic<bool>("isWebViewAvailable");
            }
            return (bool)_webViewPackageIsAvailable;
        }

        public override void LoadHtml(string html) {

            _assertValidState();
            _webView.Call("loadHtml", html);
        }

        /// <summary>
        /// Like IWebView.LoadHtml(), but also allows a virtual base URL
        /// to be specified. Setting a base URL allows, for example, for
        /// additional resources like CSS and JavaScript files to be referenced
        /// via a relative path.
        /// </summary>
        /// <example>
        /// <code>
        /// <![CDATA[
        /// // Load some HTML that references a javascript.js file
        /// // located in Application.persistentDataPath.
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID && !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     var persistentDataPathFileUrl = "file://" + Application.persistentDataPath;
        ///     androidWebView.LoadHtml(
        ///         @"<div>
        ///             <script src='javascript.js'></script>
        ///             <h1>Hello!</h1>
        ///         </div>",
        ///         persistentDataPathFileUrl
        ///     );
        /// #endif
        /// ]]>
        /// </code>
        /// </example>
        public void LoadHtml(string html, string baseUrl) {

            _assertValidState();
            _webView.Call("loadHtml", html, baseUrl);
        }

        public override void LoadUrl(string url) {

            _assertValidState();
            _webView.Call("loadUrl", _transformUrlIfNeeded(url));
        }

        public override void LoadUrl(string url, Dictionary<string, string> additionalHttpHeaders) {

            _assertValidState();
            if (additionalHttpHeaders == null) {
                LoadUrl(url);
            } else {
                var map = _convertDictionaryToJavaMap(additionalHttpHeaders);
                _webView.Call("loadUrl", url, map);
            }
        }

        /// <see cref="IWithMovablePointer"/>
        public void MovePointer(Vector2 point) {

            _assertValidState();
            var nativeX = (int)(point.x * _nativeWidth);
            var nativeY = (int)(point.y * _nativeHeight);
            _webView.Call("movePointer", nativeX, nativeY);
        }

        /// <summary>
        /// Pauses processing, media, and rendering for this webview instance
        /// until Resume() is called.
        /// </summary>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.Pause();
        /// #endif
        /// </code>
        /// </example>
        public void Pause() {

            _assertValidState();
            _webView.Call("pause");
        }

        /// <summary>
        /// Pauses processing, media, and rendering for all webview instances.
        /// By default, 3D WebView automatically calls this method when the application
        /// is paused.
        /// </summary>
        /// <remarks>
        /// This method internally calls android.webkit.WebView.pauseTimers(), which globally affects all
        /// native webview instances. So, if your project contains other plugins that use
        /// the System WebView (for example, ad SDKs), they can be affected by this method.
        /// If you find that 3D WebView is interfering with an ad SDK or other plugin in your project that
        /// uses the System WebView, please add the scripting symbol `VUPLEX_ANDROID_DISABLE_AUTOMATIC_PAUSING`
        /// to your project to prevent 3D WebView from automatically calling this method.
        /// </remarks>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     AndroidWebView.PauseAll();
        /// #endif
        /// </code>
        /// </example>
        public static void PauseAll() {

            _class.CallStatic("pauseAll");
        }

        /// <see cref="IWithPointerDownAndUp"/>
        public void PointerDown(Vector2 point) {

            _pointerDown(point, MouseButton.Left, 1);
        }

        /// <see cref="IWithPointerDownAndUp"/>
        public void PointerDown(Vector2 point, PointerOptions options) {

            if (options == null) {
                options = new PointerOptions();
            }
            _pointerDown(point, options.Button, options.ClickCount);
        }

        /// <see cref="IWithPointerDownAndUp"/>
        public void PointerUp(Vector2 point) {

            _pointerUp(point, MouseButton.Left, 1);
        }

        /// <see cref="IWithPointerDownAndUp"/>
        public void PointerUp(Vector2 point, PointerOptions options) {

            if (options == null) {
                options = new PointerOptions();
            }
            _pointerUp(point, options.Button, options.ClickCount);
        }

        /// <summary>
        /// Loads the given URL using an HTTP POST request and the given
        /// application/x-www-form-urlencoded data.
        /// </summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.PostUrl("https://postman-echo.com/post", Encoding.Unicode.GetBytes("foo=bar"));
        /// #endif
        /// </code>
        /// </example>
        public void PostUrl(string url, byte[] data) {

            _assertValidState();
            _webView.Call("postUrl", url, data);
        }

        public override void Reload() {

            _assertValidState();
            _webView.Call("reload");
        }

        /// <summary>
        /// Resumes processing and rendering for all webview instances
        /// after a previous call to Pause().
        /// </summary>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.Resume();
        /// #endif
        /// </code>
        /// </example>
        public void Resume() {

            _assertValidState();
            _webView.Call("resume");
        }

        /// <summary>
        /// Resumes processing and rendering for all webview instances
        /// after a previous call to PauseAll(). This method
        /// is automatically called by the plugin when the application resumes after
        /// being paused.
        /// </summary>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     AndroidWebView.ResumeAll();
        /// #endif
        /// </code>
        /// </example>
        public static void ResumeAll() {

            _class.CallStatic("resumeAll");
        }

        public override void Scroll(Vector2 scrollDelta) {

            _assertValidState();
            var deltaX = (int)(scrollDelta.x * _numberOfPixelsPerUnityUnit);
            var deltaY = (int)(scrollDelta.y * _numberOfPixelsPerUnityUnit);
            _webView.Call("scroll", deltaX, deltaY);
        }

        public override void Scroll(Vector2 scrollDelta, Vector2 point) {

            _assertValidState();
            var deltaX = (int)(scrollDelta.x * _numberOfPixelsPerUnityUnit);
            var deltaY = (int)(scrollDelta.y * _numberOfPixelsPerUnityUnit);
            var pointerX = (int)(point.x * _nativeWidth);
            var pointerY = (int)(point.y * _nativeHeight);
            _webView.Call("scroll", deltaX, deltaY, pointerX, pointerY);
        }

        public static void SetAlternativeKeyboardInputSystemEnabled(bool enabled) {

            _class.CallStatic("setAlternativeKeyboardInputSystemEnabled", enabled);
        }

        /// <summary>
        /// By default, 3D WebView dispatches pointer (a.k.a mouse) events to the
        /// browser engine in a way that accurately mimics the functionality of
        /// a desktop browser. This works great in most cases, but on some systems
        /// (i.e. Oculus Quest 2), the system version of Chromium is buggy and out-of-date,
        /// which can lead to issues where pointer events aren't dispatched accurately.
        /// In those cases, this method can be used to enable an alternative pointer
        /// input system that is less flexible but doesn't suffer from the Chromium
        /// bugs. This method is called automatically by AndroidWebPlugin.cs when
        /// running on Oculus Quest 2. Note that calling this method effectively disables
        /// the ability to trigger hover or drag events with MovePointer().
        /// </summary>
        public static void SetAlternativePointerInputSystemEnabled(bool enabled) {

            _class.CallStatic("setAlternativePointerInputSystemEnabled", enabled);
        }

        /// <summary>
        /// By default, web pages cannot access the device's
        /// camera or microphone via JavaScript, even if the user has granted
        /// the app permission to use them. Invoking `SetAudioAndVideoCaptureEnabled(true)` allows
        /// **all web pages** to access the camera and microphone if the user has
        /// granted the app permission to use them via the standard Android permission dialogs.
        /// </summary>
        /// <remarks>
        /// This is useful, for example, to enable WebRTC support.
        /// In addition to calling this method, the application must include the following Android
        /// permissions in its AndroidManifest.xml and also request the permissions at runtime.
        /// - android.permission.RECORD_AUDIO
        /// - android.permission.MODIFY_AUDIO_SETTINGS
        /// - android.permission.CAMERA
        /// </remarks>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     AndroidWebView.SetAudioAndVideoCaptureEnabled(true);
        /// #endif
        /// </code>
        /// </example>
        public static void SetAudioAndVideoCaptureEnabled(bool enabled) {

            _class.CallStatic("setAudioAndVideoCaptureEnabled", enabled);
        }

        public static void SetAutoplayEnabled(bool enabled) {

            _class.CallStatic("setAutoplayEnabled", enabled);
        }

        public static void SetClickCorrectionEnabled(bool enabled) {

            _class.CallStatic("setClickCorrectionEnabled", enabled);
        }

        [Obsolete("AndroidWebView.SetCustomUriSchemesEnabled() has been removed. Now when a page redirects to a URI with a custom scheme, 3D WebView will automatically emit the UrlChanged and LoadProgressChanged events for the navigation, but a deep link (i.e. to an external application) won't occur.", true)]
        public static void SetCustomUriSchemesEnabled(bool enabled) {}

        /// <summary>
        /// Enables WideVine DRM. DRM is disabled by default because it
        /// could potentially be used for tracking.
        /// </summary>
        /// <remarks>
        /// You can verify that DRM is enabled by using the DRM Stream Test
        /// on [this page](https://bitmovin.com/demos/drm).
        /// </remarks>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     AndroidWebView.SetDrmEnabled(true);
        /// #endif
        /// </code>
        /// </example>
        public static void SetDrmEnabled(bool enabled) {

            _class.CallStatic("setDrmEnabled", enabled);
        }

        public override void SetFocused(bool focused) {

            _assertValidState();
            _webView.Call("setFocused", focused);
        }

        /// <summary>
        /// Sets the force dark mode for this WebView. Note that this API is only supported on Android API level >= 29
        /// and is ignored in older versions of Android.
        /// </summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.SetForceDark(ForceDark.On);
        /// #endif
        /// </code>
        /// </example>
        /// <seealso href="https://developer.android.com/reference/android/webkit/WebSettings#setForceDark(int)">android.webkit.WebSettings.setForceDark()</seealso>
        public void SetForceDark(ForceDark forceDark) {

            _assertValidState();
            _webView.Call("setForceDark", (int)forceDark);
        }

        [Obsolete("AndroidWebView.SetForceDrawEnabled() has been removed because it is no longer needed.", true)]
        public static void SetForceDrawEnabled(bool enabled) {}

        /// <summary>
        /// By default, web pages cannot access the device's
        /// geolocation via JavaScript, even if the user has granted
        /// the app permission to access location. Invoking `SetGeolocationPermissionEnabled(true)` allows
        /// **all web pages** to access the geolocation if the user has
        /// granted the app location permissions via the standard Android permission dialogs.
        /// </summary>
        /// <remarks>
        /// The following Android permissions must be included in the app's AndroidManifest.xml
        /// and also requested by the application at runtime:
        /// - android.permission.ACCESS_COARSE_LOCATION
        /// - android.permission.ACCESS_FINE_LOCATION
        /// </remarks>
        /// <example>
        /// <code>
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     AndroidWebView.SetGeolocationPermissionEnabled(true);
        /// #endif
        /// </code>
        /// </example>
        public static void SetGeolocationPermissionEnabled(bool enabled) {

            _class.CallStatic("setGeolocationPermissionEnabled", enabled);
        }

        public static void SetIgnoreCertificateErrors(bool ignore) {

            _class.CallStatic("setIgnoreCertificateErrors", ignore);
        }

        [Obsolete("AndroidWebView.SetIgnoreSslErrors() is now deprecated. Please use Web.SetIgnoreCertificateErrors() instead.")]
        public static void SetIgnoreSslErrors(bool ignore) {

            SetIgnoreCertificateErrors(ignore);
        }

        /// <summary>
        /// Sets the initial scale for web content, where 1.0 is the default scale.
        /// </summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.SetInitialScale(1.75f);
        /// #endif
        /// </code>
        /// </example>
        public void SetInitialScale(float scale) {

            _assertValidState();
            _webView.Call("setInitialScale", scale);
        }

        /// <summary>
        /// By default, a native file picker is shown for file inputs,
        /// but this method can be used to disable it. Note that the screen orientation
        /// of the native file picker UI is determined by the "Auto-rotate screen" preference
        /// in the device's Settings app.
        /// <summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.SetNativeFileSelectionEnabled(false);
        /// #endif
        /// </code>
        /// </example>
        public void SetNativeFileSelectionEnabled(bool enabled) {

            _assertValidState();
            _webView.Call("setNativeFileSelectionEnabled", enabled);
        }

        [Obsolete("AndroidWebView.SetMediaPlaybackRequiresUserGesture() is now deprecated. Please call Web.SetAutoplayEnabled(true) instead.")]
        public void SetMediaPlaybackRequiresUserGesture(bool mediaPlaybackRequiresUserGesture) {

            _assertValidState();
            _webView.Call("setMediaPlaybackRequiresUserGesture", mediaPlaybackRequiresUserGesture);
        }

        [Obsolete("AndroidWebView.SetNativeKeyboardEnabled() is now deprecated. Instead, please use the NativeOnScreenKeyboardEnabled property of WebViewPrefab / CanvasWebViewPrefab or the IWithNativeOnScreenKeyboard interface.")]
        public static void SetNativeKeyboardEnabled(bool enabled) {

            SetTouchScreenKeyboardEnabled(enabled);
        }

        /// <see cref="IWithNativeOnScreenKeyboard"/>
        public void SetNativeOnScreenKeyboardEnabled(bool enabled) {

            _assertValidState();
            _webView.Call("setNativeOnScreenKeyboardEnabled", enabled);
        }

        [Obsolete("AndroidWebView.SetNativeVideoRenderingEnabled() has been removed because native video is now supported on all devices.", true)]
        public static void SetNativeVideoRenderingEnabled(bool enabled) {}

        /// <see cref="IWithNative2DMode"/>
        public void SetNativeZoomEnabled(bool enabled) {

            _assertValidState();
            _assertNative2DModeEnabled();
            _webView.Call("setNativeZoomEnabled", enabled);
        }

        /// <see cref="IWithPopups"/>
        public void SetPopupMode(PopupMode popupMode) {

            _assertValidState();
            if (Native2DModeEnabled) {
                WebViewLogger.LogWarning("SetPopupMode() was called but will be ignored because SetPopupMode() is not supported in Native 2D Mode.");
                return;
            }
            _webView.Call("setPopupMode", (int)popupMode);
        }

        /// <see cref="IWithNative2DMode"/>
        public void SetRect(Rect rect) {

            _assertValidState();
            _assertNative2DModeEnabled();
            this.Rect = rect;
            _webView.Call("setRect", (int)rect.x, (int)rect.y, (int)rect.width, (int)rect.height);
        }

        public override void SetRenderingEnabled(bool enabled) {

            _assertValidState();
            if (Native2DModeEnabled) {
                VXUtils.LogNative2DModeWarning("SetRenderingEnabled");
                return;
            }
            _webView.Call("setRenderingEnabled", enabled);
            _renderingEnabled = enabled;
        }

        public override void SetResolution(float pixelsPerUnityUnit) {

            if (Native2DModeEnabled) {
                VXUtils.LogNative2DModeWarning("SetResolution");
                return;
            }
            base.SetResolution(pixelsPerUnityUnit);
        }

        public static void SetStorageEnabled(bool enabled) {

            _class.CallStatic("setStorageEnabled", enabled);
        }

        /// <summary>
        /// Sets the android.view.Surface to which the webview renders.
        /// This can be used, for example, to render to an Oculus
        /// [OVROverlay](https://developer.oculus.com/reference/unity/1.30/class_o_v_r_overlay).
        /// After this method is called, the webview no longer renders
        /// to its original texture and instead renders to the given surface.
        /// </summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// var surface = ovrOverlay.externalSurfaceObject();
        /// // Set the resolution to 1 px / Unity unit
        /// // to make it easy to specify the size in pixels.
        /// webViewPrefab.WebView.SetResolution(1);
        /// webViewPrefab.Resize(surface.externalSurfaceWidth(), surface.externalSurfaceHeight());
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.SetSurface(surface);
        /// #endif
        /// </code>
        /// </example>
        public void SetSurface(IntPtr surface) {

            _assertValidState();
            var surfaceObject = _convertIntPtrToAndroidJavaObject(surface);
            _webView.Call("setSurface", surfaceObject);
        }

        /// <summary>
        /// Sets the text zoom of the page in percent. For example, the browser engine automatically
        /// adjusts the size of web pages' text by default based on the "Font size" preference
        /// in the device's Settings app, but you can use `SetTextZoom(100)` to force that
        /// system font size preference to be ignored.
        /// </summary>
        /// <example>
        /// <code>
        /// await webViewPrefab.WaitUntilInitialized();
        /// #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///     var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///     androidWebView.SetTextZoom(100);
        /// #endif
        /// </code>
        /// <example>
        /// <seealso href="https://developer.android.com/reference/android/webkit/WebSettings#setTextZoom(int)">android.webkit.WebSettings.setTextZoom()</seealso>v
        public void SetTextZoom(int textZoom) {

            _assertValidState();
            _webView.Call("setTextZoom", textZoom);
        }

        // Deprecated
        public static void SetTouchScreenKeyboardEnabled(bool enabled) {

            _class.CallStatic("setTouchScreenKeyboardEnabled", enabled);
        }


        /// <see cref="IWithSettableUserAgent"/>
        public void SetUserAgent(bool mobile) {

            _assertValidState();
            _webView.Call("setUserAgent", mobile);
        }

        /// <see cref="IWithSettableUserAgent"/>
        public void SetUserAgent(string userAgent) {

            _assertValidState();
            _webView.Call("setUserAgent", userAgent);
        }

        /// <see cref="IWithNative2DMode"/>
        public void SetVisible(bool visible) {

            _assertValidState();
            _assertNative2DModeEnabled();
            Visible = visible;
            _webView.Call("setVisible", visible);
        }

        [Obsolete("AndroidWebView.UseAlternativeInputEventSystem() has been removed. Please use AndroidWebView.SetAlternativePointerInputSystemEnabled() and/or SetAlternativeKeyboardInputSystemEnabled() instead.", true)]
        public void UseAlternativeInputEventSystem(bool useAlternativeInputEventSystem) {}

        /// <summary>
        /// Zooms in or out by the given factor, which is multiplied by the current zoom level
        /// to reach the new zoom level.
        /// </summary>
        /// <remarks>
        /// Note that the zoom level gets reset when a new page is loaded.
        /// </remarks>
        /// <param name="zoomFactor">
        /// The zoom factor to apply in the range from 0.01 to 100.0.
        /// </param>
        /// <example>
        /// <code>
        /// // Zoom by 1.75 after the page finishes loading.
        /// await webViewPrefab.WaitUntilInitialized();
        /// webViewPrefab.WebView.LoadProgressChanged += (sender, eventArgs) => {
        ///     if (eventArgs.Type == ProgressChangeType.Finished) {
        ///         #if UNITY_ANDROID &amp;&amp; !UNITY_EDITOR
        ///             var androidWebView = webViewPrefab.WebView as AndroidWebView;
        ///             androidWebView.ZoomBy(1.75f);
        ///         #endif
        ///     }
        /// };
        /// </code>
        /// </example>
        public void ZoomBy(float zoomFactor) {

            _assertValidState();
            _webView.Call("zoomBy", zoomFactor);
        }

        public override void ZoomIn() {

            _assertValidState();
            if (Native2DModeEnabled) {
                VXUtils.LogNative2DModeWarning("ZoomIn");
                return;
            }
            _webView.Call("zoomIn");
        }

        public override void ZoomOut() {

            _assertValidState();
            if (Native2DModeEnabled) {
                VXUtils.LogNative2DModeWarning("ZoomOut");
                return;
            }
            _webView.Call("zoomOut");
        }

        const string _2dWebViewClassName = "com.vuplex.webview.WebView";
        const string _3dWebViewClassName = "com.vuplex.webview.WebView3D";
        // Get a reference to AndroidJavaObject's hidden constructor that takes
        // the IntPtr for a jobject as a parameter.
        readonly static ConstructorInfo _androidJavaObjectIntPtrConstructor = typeof(AndroidJavaObject).GetConstructor(
            BindingFlags.Instance | BindingFlags.NonPublic,
            null,
            new []{ typeof(IntPtr) },
            null
        );
        internal static AndroidJavaClass _class = new AndroidJavaClass(_3dWebViewClassName);
        EventHandler<ScriptDialogEventArgs> _scriptAlertHandler;
        EventHandler<ScriptDialogEventArgs<bool>> _scriptConfirmHandler;
        readonly WaitForEndOfFrame _waitForEndOfFrame = new WaitForEndOfFrame();
        internal AndroidJavaObject _webView;
        static bool? _webViewPackageIsAvailable = null;

        void _assertNative2DModeEnabled() {

            if (!Native2DModeEnabled) {
                throw new InvalidOperationException("IWithNative2DMode methods can only be called on a webview with Native 2D Mode enabled.");
            }
        }

        AndroidJavaObject _convertDictionaryToJavaMap(Dictionary<string, string> dictionary) {

            AndroidJavaObject map = new AndroidJavaObject("java.util.HashMap");
            IntPtr putMethod = AndroidJNIHelper.GetMethodID(map.GetRawClass(), "put", "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");
            foreach (var entry in dictionary) {
                AndroidJNI.CallObjectMethod(
                    map.GetRawObject(),
                    putMethod,
                    AndroidJNIHelper.CreateJNIArgArray(new object[] { entry.Key, entry.Value })
                );
            }
            return map;
        }

        static AndroidJavaObject _convertIntPtrToAndroidJavaObject(IntPtr jobject) {

            if (jobject == IntPtr.Zero) {
                return null;
            }
            return (AndroidJavaObject) _androidJavaObjectIntPtrConstructor.Invoke(new object[] { jobject });
        }

        void _handlePopup(string url, AndroidJavaObject popupResultMessage) {

            var handler = PopupRequested;
            if (handler == null) {
                return;
            }
            if (popupResultMessage == null) {
                handler(this, new PopupRequestedEventArgs(url, null));
                return;
            }
            var popupWebView = Instantiate();
            Dispatcher.RunOnMainThread(() => {
                AndroidWebPlugin.Instance.CreateTexture(1, 1, texture => {
                    // Use the same resolution and dimensions as the current webview.
                    popupWebView.SetResolution(_numberOfPixelsPerUnityUnit);
                    popupWebView._init(texture, _width, _height, null, popupResultMessage);
                    handler(this, new PopupRequestedEventArgs(url, popupWebView));
                });
            });
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleRenderProcessGone() {

            var handler = RenderProcessGone;
            if (handler != null) {
                handler(this, EventArgs.Empty);
            }
        }

        void _handleScriptAlert(string message, Action<bool> continueCallback) {

            _scriptAlertHandler(this, new ScriptDialogEventArgs(message, () => continueCallback(true)));
        }

        void _handleScriptConfirm(string message, Action<bool> continueCallback) {

            _scriptConfirmHandler(this, new ScriptDialogEventArgs<bool>(message, continueCallback));
        }

        void _init(Texture2D viewportTexture, float width, float height, Texture2D videoTexture, AndroidJavaObject popupResultMessage) {

            base.Init(viewportTexture, width, height, videoTexture);
            _webView = new AndroidJavaObject(
                _3dWebViewClassName,
                gameObject.name,
                viewportTexture.GetNativeTexturePtr().ToInt32(),
                _nativeWidth,
                _nativeHeight,
                SystemInfo.graphicsMultiThreaded,
                new AndroidStringAndObjectCallback(_handlePopup),
                popupResultMessage
            );
        }

        void OnEnable() {

            // Start the coroutine from OnEnable so that the coroutine
            // is restarted if the object is deactivated and then reactivated.
            StartCoroutine(_renderPluginOncePerFrame());
        }

        void _pointerDown(Vector2 point, MouseButton mouseButton, int clickCount) {

            _assertValidState();
            var nativeX = (int)(point.x * _nativeWidth);
            var nativeY = (int)(point.y * _nativeHeight);
            _webView.Call("pointerDown", nativeX, nativeY, (int)mouseButton, clickCount);
        }

        void _pointerUp(Vector2 point, MouseButton mouseButton, int clickCount) {

            _assertValidState();
            var nativeX = (int)(point.x * _nativeWidth);
            var nativeY = (int)(point.y * _nativeHeight);
            _webView.Call("pointerUp", nativeX, nativeY, (int)mouseButton, clickCount);
        }

        IEnumerator _renderPluginOncePerFrame() {

            while (true) {
                yield return _waitForEndOfFrame;
                if (Native2DModeEnabled) {
                    // The native render function isn't needed for 2D optimized mode.
                    break;
                }
                if (!_renderingEnabled || IsDisposed || _webView == null) {
                    continue;
                }
                var nativeWebViewPtr = _webView.GetRawObject();
                if (nativeWebViewPtr != IntPtr.Zero) {
                    int pointerId = WebView_depositPointer(nativeWebViewPtr);
                    GL.IssuePluginEvent(WebView_getRenderFunction(), pointerId);
                }
            }
        }

        protected override void _resize() {

            // Only trigger a resize if the webview has been initialized
            if (_viewportTexture) {
                _assertValidState();
                VXUtils.ThrowExceptionIfAbnormallyLarge(_nativeWidth, _nativeHeight);
                _webView.Call("resize", _nativeWidth, _nativeHeight);
            }
        }

        protected override void _setConsoleMessageEventsEnabled(bool enabled) {

            _assertValidState();
            _webView.Call("setConsoleMessageEventsEnabled", enabled);
        }

        protected override void _setFocusedInputFieldEventsEnabled(bool enabled) {

            _assertValidState();
            _webView.Call("setFocusedInputFieldEventsEnabled", enabled);
        }

        [DllImport(_dllName)]
        static extern IntPtr WebView_getRenderFunction();

        [DllImport(_dllName)]
        static extern int WebView_depositPointer(IntPtr pointer);

        [DllImport(_dllName)]
        static extern void WebView_removePointer(IntPtr pointer);
    }
}
#endif
