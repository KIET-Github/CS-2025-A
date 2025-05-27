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
// For now, ignore the warning that 3D WebView's
// callback-based APIs for legacy .NET are deprecated.
#pragma warning disable CS0618
using System;
using UnityEngine;
using UnityEngine.EventSystems;
#if NET_4_6 || NET_STANDARD_2_0
    using System.Threading.Tasks;
#endif
using Vuplex.WebView.Internal;

namespace Vuplex.WebView {

    public abstract class BaseWebViewPrefab : MonoBehaviour {

        /// <summary>
        /// Indicates that the prefab was clicked. Note that the prefab automatically
        /// calls IWebView.Click() for you.
        /// </summary>
        /// <remarks>
        /// This event is not supported when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).
        /// </remarks>
        /// <example>
        /// <code>
        /// webViewPrefab.Clicked += (sender, eventArgs) => {
        ///     Debug.Log("WebViewPrefab was clicked at point: " + eventArgs.Point);
        /// };
        /// </code>
        /// </example>
        public virtual event EventHandler<ClickedEventArgs> Clicked;

        /// <summary>
        /// Indicates that the prefab finished initializing,
        /// so its WebView property is ready to use.
        /// </summary>
        /// <seealso cref="WaitUntilInitialized"/>
        public event EventHandler Initialized;

        /// <summary>
        /// Indicates that the prefab was scrolled. Note that the prefab automatically
        /// calls IWebView.Scroll() for you.
        /// </summary>
        /// <remarks>
        /// This event is not supported when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).
        /// </remarks>
        /// <example>
        /// webViewPrefab.Scrolled += (sender, eventArgs) => {
        ///     Debug.Log($"WebViewPrefab was scrolled. Point: {eventArgs.Point}, scroll delta: {eventArgs.ScrollDelta}");
        /// };
        /// </example>
        public virtual event EventHandler<ScrolledEventArgs> Scrolled;

        /// <summary>
        /// If you drag the prefab into the scene via the editor,
        /// you can set this property to make it so that the instance
        /// automatically loads the given URL after it initializes. To load a new URL
        /// at runtime, use IWebView.LoadUrl() instead.
        /// </summary>
        [Label("Initial URL (optional)")]
        [Tooltip("You can set this to the URL that you want to load, or you can leave it blank if you'd rather add a script to load content programmatically with IWebView.LoadUrl() or LoadHtml().")]
        [HideInInspector]
        /// <seealso href="https://support.vuplex.com/articles/how-to-load-local-files">How to load local files</seealso>
        public string InitialUrl;

        /// <summary>
        /// Determines how the prefab handles drag interactions.
        /// </summary>
        /// <remarks>
        /// Important notes:
        /// <list type="bullet">
        ///   <item>This property is ignored when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).</item>
        ///   <item>
        ///     For information on the limitations of drag interactions on iOS and UWP, please see
        ///     [this article](https://support.vuplex.com/articles/hover-and-drag-limitations).
        ///   </item>
        /// </list>
        /// </remarks>
        /// <seealso href="https://support.vuplex.com/articles/dragging-scrollbar">When I drag a scrollbar, why does it scroll the wrong way?</seealso>
        [Tooltip("Determines how the prefab handles drag interactions. Note that This property is ignored when running in Native 2D Mode.")]
        public DragMode DragMode = DragMode.DragToScroll;

        /// <summary>
        /// Determines whether clicking is enabled.
        /// </summary>
        /// <remarks>
        /// This property is ignored when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).
        /// </remarks>
        public bool ClickingEnabled = true;

        /// <summary>
        /// Determines whether hover interactions are enabled.
        /// </summary>
        /// <remarks>
        /// Important notes:
        /// <list type="bullet">
        ///   <item>This property is ignored when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).</item>
        ///   <item>
        ///     For information on the limitations of hovering on iOS and UWP, please see
        ///     [this article](https://support.vuplex.com/articles/hover-and-drag-limitations).
        ///   </item>
        /// </list>
        /// </remarks>
        public bool HoveringEnabled = true;

        /// <summary>
        /// Determines whether scrolling is enabled.
        /// </summary>
        /// <remarks>
        /// This property is ignored when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).
        /// </remarks>
        public bool ScrollingEnabled = true;

        /// <summary>
        /// Determines the threshold (in web pixels) for triggering a drag. The default is 20.
        /// </summary>
        /// <remarks>
        /// <list type="bullet">
        ///   <item>
        ///     When the prefab's DragMode is set to DragToScroll, this property determines
        ///     the distance that the pointer must drag before it's no longer
        ///     considered a click.
        ///   </item>
        ///   <item>
        ///     When the prefab's DragMode is set to DragWithinPage, this property determines
        ///     the distance that the pointer must drag before it triggers
        ///     a drag within the page.
        ///   </item>
        ///   <item>This property is ignored when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).</item>
        /// </list>
        /// </remarks>
        [Label("Drag Threshold (px)")]
        [Tooltip("Determines the threshold (in web pixels) for triggering a drag.")]
        public float DragThreshold = 20;

        [Obsolete("The WebViewPrefab.DragToScrollThreshold property is obsolete. Please use DragThreshold instead.")]
        public float DragToScrollThreshold { get; set; }

        [Header("Debugging")]
        /// <summary>
        /// Determines whether remote debugging is enabled.
        /// </summary>
        /// <seealso href="https://support.vuplex.com/articles/how-to-debug-web-content"/>
        [Tooltip("Determines whether remote debugging is enabled.")]
        public bool RemoteDebuggingEnabled = false;

        /// <summary>
        /// Determines whether JavaScript console messages from IWebView.ConsoleMessageLogged
        /// are printed to the Unity logs.
        /// <summary>
        [Tooltip("Determines whether JavaScript console messages are printed to the Unity logs.")]
        public bool LogConsoleMessages = false;

        /// <summary>
        /// Gets or sets prefab's material.
        /// </summary>
        /// <remarks>
        /// This property is unused when running in [Native 2D Mode](https://support.vuplex.com/articles/native-2d-mode).
        /// </remarks>
        public Material Material {
            get {
                return _view.Material;
            }
            set {
                _view.Material = value;
            }
        }

        /// <summary>
        /// Gets or sets whether the instance is visible. The default is `true`.
        /// </summary>
        public virtual bool Visible {
            get {
                return _view.Visible;
            }
            set {
                _view.Visible = value;
                if (_videoLayerIsEnabled) {
                    _videoLayer.Visible = value;
                }
            }
        }

        /// <summary>
        /// Gets the prefab's IWebView, which
        /// is available after the Initialized event is raised.
        /// Before initialization is complete, this property is `null`.
        /// </summary>
        public IWebView WebView {
            get {
                if (_cachedWebView == null) {
                    if (_webViewGameObject == null) {
                        return null;
                    }
                    _cachedWebView = _webViewGameObject.GetComponent<IWebView>();
                }
                return _cachedWebView;
            }
            private set {
                var monoBehaviour = value as MonoBehaviour;
                if (monoBehaviour == null) {
                    throw new ArgumentException("The IWebView cannot be set successfully because it's not a MonoBehaviour.");
                }
                _webViewGameObject = monoBehaviour.gameObject;
                _cachedWebView = value;
            }
        }

        /// <summary>
        /// Destroys the instance and its children. Note that you don't have
        /// to call this method if you destroy the instance's parent with
        /// Object.Destroy().
        /// </summary>
        /// <example>
        /// <code>
        /// // The webview can no longer be used after it's destroyed.
        /// webViewPrefab.Destroy();
        /// </code>
        /// </example>
        public void Destroy() {

            UnityEngine.Object.Destroy(gameObject);
        }

        public void SetCutoutRect(Rect rect) {

            _view.SetCutoutRect(rect);
        }

        /// <summary>
        /// Sets options that can be used to alter the webview that the prefab creates
        /// during initialization. This method can only be called prior to
        /// when the prefab initializes (i.e. directly after instantiating it or setting it to active).
        /// </summary>
        public void SetOptionsForInitialization(WebViewOptions options) {

            if (WebView != null) {
                throw new ArgumentException("SetOptionsForInitialization() was called after the prefab was already initialized. Please call it before initialization instead.");
            }
            _options = options;
        }

        /// <summary>
        /// By default, the prefab detects pointer input events like clicks through
        /// Unity's event system, but you can use this method to override the way that
        /// input events are detected.
        /// </summary>
        /// <example>
        /// <code>
        /// var yourCustomInputDetector = webViewPrefab.Collider.AddComponent&lt;YourCustomInputDetector&gt;();
        /// webViewPrefab.SetPointerInputDetector(yourCustomInputDetector);
        /// </code>
        /// </example>
        public void SetPointerInputDetector(IPointerInputDetector pointerInputDetector) {

            var previousPointerInputDetector = _pointerInputDetector;
            _pointerInputDetector = pointerInputDetector;
            // If WebView hasn't been set yet, then _initPointerInputDetector
            // will get called before it's set to initialize _pointerInputDetector.
            if (WebView != null) {
                _initPointerInputDetector(WebView, previousPointerInputDetector);
            }
        }

        /// <summary>
        /// By default, the prefab creates a new IWebView during initialization. However,
        /// you can call this method before the prefab initializes to pass it an existing,
        /// initialized IWebView to use instead. This method can only be called prior to
        /// when the prefab initializes (i.e. directly after instantiating it or setting it to active).
        /// </summary>
        public void SetWebViewForInitialization(IWebView webView) {

            if (WebView != null) {
                throw new ArgumentException("SetWebViewForInitialization() was called after the prefab was already initialized. Please call it before initialization instead.");
            }
            if (webView != null && !webView.IsInitialized) {
                throw new ArgumentException("SetWebViewForInitialization(IWebView) was called with an uninitialized webview, but an initialized webview is required.");
            }
            _webViewForInitialization = webView;
        }

    #if NET_4_6 || NET_STANDARD_2_0
        /// <summary>
        /// Returns a task that resolves when the prefab is initialized
        /// (i.e. when its WebView property is ready for use).
        /// </summary>
        /// <example>
        /// <c>await webViewPrefab.WaitUntilInitialized();</c>
        /// </example>
        public Task WaitUntilInitialized() {

            var taskCompletionSource = new TaskCompletionSource<bool>();
            var isInitialized = WebView != null;
            if (isInitialized) {
                taskCompletionSource.SetResult(true);
            } else {
                Initialized += (sender, e) => taskCompletionSource.SetResult(true);
            }
            return taskCompletionSource.Task;
        }
    #endif

        [SerializeField]
        [HideInInspector]
        ViewportMaterialView _cachedVideoLayer;
        [SerializeField]
        [HideInInspector]
        ViewportMaterialView _cachedView;
        IWebView _cachedWebView;
        // Used for DragMode.DragToScroll and DragMode.Disabled
        bool _clickIsPending;
        bool _consoleMessageLoggedHandlerAttached;
        bool _loggedDragWarning;
        static bool _loggedHoverWarning;
        protected WebViewOptions _options;
        [SerializeField]
        [HideInInspector]
        MonoBehaviour _pointerInputDetectorMonoBehaviour;
        IPointerInputDetector _pointerInputDetector {
            get {
                return _pointerInputDetectorMonoBehaviour == null ? null :
                                                                    _pointerInputDetectorMonoBehaviour as IPointerInputDetector;
            }
            set {
                var monoBehaviour = value as MonoBehaviour;
                if (monoBehaviour == null) {
                    throw new ArgumentException("The provided IPointerInputDetector can't be successfully set because it's not a MonoBehaviour");
                }
                _pointerInputDetectorMonoBehaviour = monoBehaviour;
            }
        }
        bool _pointerIsDown;
        Vector2 _pointerDownRatioPoint;
        Vector2 _previousDragPoint;
        Vector2 _previousMovePointerPoint;
        static bool _remoteDebuggingEnabled;
        protected ViewportMaterialView _videoLayer {
            get {
                if (_cachedVideoLayer == null) {
                    _cachedVideoLayer = _getVideoLayer();
                }
                return _cachedVideoLayer;
            }
        }
        bool _videoLayerIsEnabled {
            get {
                return _videoLayer != null && _videoLayer.gameObject.activeSelf;
            }
            set {
                if (_videoLayer != null) {
                    _videoLayer.gameObject.SetActive(value);
                }
            }
        }
        Material _videoMaterial;
        protected ViewportMaterialView _view {
            get {
                if (_cachedView == null) {
                    _cachedView = _getView();
                }
                return _cachedView;
            }
        }
        Material _viewMaterial;
        IWebView _webViewForInitialization;
        [SerializeField]
        [HideInInspector]
        GameObject _webViewGameObject;

        void _attachWebViewEventHandlers(IWebView webView) {

            if (!_options.disableVideo) {
                webView.VideoRectChanged += (sender, e) => _setVideoRect(e.Value);
            }
            if (LogConsoleMessages) {
                _consoleMessageLoggedHandlerAttached = true;
                webView.ConsoleMessageLogged += WebView_ConsoleMessageLogged;
            }
        }

        protected abstract Vector2 _convertRatioPointToUnityUnits(Vector2 point);

        protected abstract float _getInitialResolution();

        protected abstract float _getScrollingSensitivity();

        protected abstract bool _getNativeOnScreenKeyboardEnabled();

        protected abstract ViewportMaterialView _getVideoLayer();

        protected abstract ViewportMaterialView _getView();

        protected void _init(Vector2 size, Rect? preferNative2DModeWithRect = null) {

            _throwExceptionIfInitialized();
            // Remote debugging can only be enabled once, before any webviews are initialized.
            if (RemoteDebuggingEnabled && !_remoteDebuggingEnabled) {
                _remoteDebuggingEnabled = true;
                Web.EnableRemoteDebugging();
            }
            // Only set WebView *after* the webview has been initialized to guarantee
            // that WebViewPrefab.WebView is ready to use as long as it's not null.
            var webView = _webViewForInitialization == null ? Web.CreateWebView(_options.preferredPlugins) : _webViewForInitialization;
            _disableHoveringIfNeeded(preferNative2DModeWithRect != null);

            if (preferNative2DModeWithRect != null && webView is IWithNative2DMode) {
                _initWebViewIfReady(webView, (Rect)preferNative2DModeWithRect, true);
                // For Native 2D Mode, deactivate both the regular view and the video layer.
                if (_view != null) {
                    _view.gameObject.SetActive(false);
                }
                _videoLayerIsEnabled = false;
                return;
            }

            var rect = new Rect(Vector2.zero, size);
            if (_options.disableVideo) {
                _videoLayerIsEnabled = false;
            } else {
                Web.CreateVideoMaterial(videoMaterial => {
                    if (videoMaterial == null) {
                        _videoLayerIsEnabled = false;
                    } else {
                        _videoMaterial = videoMaterial;
                        _videoLayer.Material = videoMaterial;
                        _setVideoRect(new Rect(0, 0, 0, 0));
                    }
                    _initWebViewIfReady(webView, rect);
                });
            }
            Web.CreateMaterial(viewMaterial => {
                _viewMaterial = viewMaterial;
                _view.Material = viewMaterial;
                _initWebViewIfReady(webView, rect);
            });
        }

        void _initPointerInputDetector(IWebView webView, IPointerInputDetector previousPointerInputDetector = null) {

            if (previousPointerInputDetector != null) {
                previousPointerInputDetector.BeganDrag -= InputDetector_BeganDrag;
                previousPointerInputDetector.Dragged -= InputDetector_Dragged;
                previousPointerInputDetector.PointerDown -= InputDetector_PointerDown;
                previousPointerInputDetector.PointerExited -= InputDetector_PointerExited;
                previousPointerInputDetector.PointerMoved -= InputDetector_PointerMoved;
                previousPointerInputDetector.PointerUp -= InputDetector_PointerUp;
                previousPointerInputDetector.Scrolled -= InputDetector_Scrolled;
            }

            if (_pointerInputDetector == null) {
                _pointerInputDetector = GetComponentInChildren<IPointerInputDetector>();
            }

            // Only enable the PointerMoved event if the webview implementation has MovePointer().
            _pointerInputDetector.PointerMovedEnabled = (webView as IWithMovablePointer) != null;
            _pointerInputDetector.BeganDrag += InputDetector_BeganDrag;
            _pointerInputDetector.Dragged += InputDetector_Dragged;
            _pointerInputDetector.PointerDown += InputDetector_PointerDown;
            _pointerInputDetector.PointerExited += InputDetector_PointerExited;
            _pointerInputDetector.PointerMoved += InputDetector_PointerMoved;
            _pointerInputDetector.PointerUp += InputDetector_PointerUp;
            _pointerInputDetector.Scrolled += InputDetector_Scrolled;
        }

        void _initWebViewIfReady(IWebView webView, Rect rect, bool enableNative2DMode = false) {

            if (!enableNative2DMode && (_view.Texture == null || (_videoLayerIsEnabled && _videoLayer.Texture == null))) {
                // Wait until both views' textures are ready.
                return;
            }
            var initializedWebViewWasProvided = webView.IsInitialized;
            if (initializedWebViewWasProvided) {
                // An initialized webview was provided via WebViewPrefab.Instantiate(IWebView),
                // so just hook up its existing textures.
                _view.Texture = webView.Texture;
                if (_videoLayer != null) {
                    _videoLayer.Texture = webView.VideoTexture;
                }
            } else {
                if (webView is IWithNative2DMode && enableNative2DMode) {
                    // Initialize the new webview in Native 2D Mode.
                    var native2DWebView = webView as IWithNative2DMode;
                    native2DWebView.InitInNative2DMode(rect);
                    // Hide the webview if Visible has already been set to false.
                    native2DWebView.SetVisible(_view.Visible);
                    _view.Visible = false;
                } else {
                    // Initialize the new webview normally, but set its resolution first
                    // so that the initial size is correct.
                    var initialResolution = _getInitialResolution();
                    if (initialResolution <= 0) {
                        WebViewLogger.LogWarningFormat("Invalid value for InitialResolution ({0}) will be ignored.", initialResolution);
                    } else {
                        webView.SetResolution(initialResolution);
                    }
                    var videoTexture = _videoLayer == null ? null : _videoLayer.Texture;
                    webView.Init(_view.Texture, rect.width, rect.height, videoTexture);
                }
            }

            // Enable or disable the native on-screen keyboard if needed (Android and iOS only).
            if (webView is IWithNativeOnScreenKeyboard) {
                var nativeOnScreenKeyboardEnabled = _getNativeOnScreenKeyboardEnabled();
                (webView as IWithNativeOnScreenKeyboard).SetNativeOnScreenKeyboardEnabled(nativeOnScreenKeyboardEnabled);
            }
            _attachWebViewEventHandlers(webView);
            // Init the pointer input detector just before setting WebView so that
            // SetPointerInputDetector() will behave correctly if it's called before WebView is set.
            _initPointerInputDetector(webView);
            // The webview is now fully initialized, so we can now set WebView and raise the Initialized event.
            WebView = webView;
            var handler = Initialized;
            if (handler != null) {
                handler(this, EventArgs.Empty);
            }
            // Lastly, load the InitialUrl.
            if (!String.IsNullOrEmpty(InitialUrl)) {
                if (initializedWebViewWasProvided) {
                    WebViewLogger.LogWarning("Custom InitialUrl value will be ignored because an initialized webview was provided.");
                } else {
                    webView.LoadUrl(InitialUrl.Trim());
                }
            }
        }

        void InputDetector_BeganDrag(object sender, EventArgs<Vector2> eventArgs) {

            _previousDragPoint = _convertRatioPointToUnityUnits(_pointerDownRatioPoint);
        }

        void InputDetector_Dragged(object sender, EventArgs<Vector2> eventArgs) {

            if (DragMode == DragMode.Disabled || WebView == null) {
                return;
            }
            var point = eventArgs.Value;
            var previousDragPoint = _previousDragPoint;
            var newDragPoint = _convertRatioPointToUnityUnits(point);
            _previousDragPoint = newDragPoint;
            var totalDragDelta = _convertRatioPointToUnityUnits(_pointerDownRatioPoint) - newDragPoint;

            if (DragMode == DragMode.DragWithinPage) {
                var dragThresholdReached = totalDragDelta.magnitude * WebView.Resolution > DragThreshold;
                if (dragThresholdReached) {
                    _movePointerIfNeeded(point);
                }
                return;
            }

            // DragMode == DragMode.DragToScroll
            var dragDelta = previousDragPoint - newDragPoint;
            _scrollIfNeeded(dragDelta, _pointerDownRatioPoint);

            // Check whether to cancel a pending viewport click so that drag-to-scroll
            // doesn't unintentionally trigger a click.
            if (_clickIsPending) {
                var dragThresholdReached = totalDragDelta.magnitude * WebView.Resolution > DragThreshold;
                if (dragThresholdReached) {
                    _clickIsPending = false;
                }
            }
        }

        protected virtual void InputDetector_PointerDown(object sender, PointerEventArgs eventArgs) {

            _pointerIsDown = true;
            _pointerDownRatioPoint = eventArgs.Point;

            if (!ClickingEnabled || WebView == null) {
                return;
            }
            if (DragMode == DragMode.DragWithinPage) {
                var webViewWithPointerDown = WebView as IWithPointerDownAndUp;
                if (webViewWithPointerDown != null) {
                    webViewWithPointerDown.PointerDown(eventArgs.Point, eventArgs.ToPointerOptions());
                    return;
                } else if (!_loggedDragWarning) {
                    _loggedDragWarning = true;
                    WebViewLogger.LogWarningFormat("The WebViewPrefab's DragMode is set to DragWithinPage, but the webview implementation for this platform ({0}) doesn't support the PointerDown and PointerUp methods needed for dragging within a page. For more info, see <em>https://developer.vuplex.com/webview/IWithPointerDownAndUp</em>.", WebView.PluginType);
                    // Fallback to setting _clickIsPending so Click() can be called.
                }
            }
            // Defer calling PointerDown() for DragToScroll so that the click can
            // be cancelled if drag exceeds the threshold needed to become a scroll.
            _clickIsPending = true;
        }

        void InputDetector_PointerExited(object sender, EventArgs eventArgs) {

            if (HoveringEnabled) {
                // Remove the hover state when the pointer exits.
                _movePointerIfNeeded(Vector2.zero);
            }
        }

        void InputDetector_PointerMoved(object sender, EventArgs<Vector2> eventArgs) {

            // InputDetector_Dragged handles calling MovePointer while dragging.
            if (_pointerIsDown || !HoveringEnabled) {
                return;
            }
            _movePointerIfNeeded(eventArgs.Value);
        }

        protected virtual void InputDetector_PointerUp(object sender, PointerEventArgs eventArgs) {

            _pointerIsDown = false;
            if (!ClickingEnabled || WebView == null) {
                return;
            }
            var webViewWithPointerDownAndUp = WebView as IWithPointerDownAndUp;
            if (DragMode == DragMode.DragWithinPage && webViewWithPointerDownAndUp != null) {
                var totalDragDelta = _convertRatioPointToUnityUnits(_pointerDownRatioPoint) - _convertRatioPointToUnityUnits(eventArgs.Point);
                var dragThresholdReached = totalDragDelta.magnitude * WebView.Resolution > DragThreshold;
                var pointerUpPoint = dragThresholdReached ? eventArgs.Point : _pointerDownRatioPoint;
                webViewWithPointerDownAndUp.PointerUp(pointerUpPoint, eventArgs.ToPointerOptions());
            } else {
                if (!_clickIsPending) {
                    return;
                }
                _clickIsPending = false;
                // PointerDown() and PointerUp() don't support the preventStealingFocus parameter.
                if (webViewWithPointerDownAndUp == null || _options.clickWithoutStealingFocus) {
                    WebView.Click(eventArgs.Point, _options.clickWithoutStealingFocus);
                } else {
                    var pointerOptions = eventArgs.ToPointerOptions();
                    webViewWithPointerDownAndUp.PointerDown(eventArgs.Point, pointerOptions);
                    webViewWithPointerDownAndUp.PointerUp(eventArgs.Point, pointerOptions);
                }
            }

            var handler = Clicked;
            if (handler != null) {
                handler(this, new ClickedEventArgs(eventArgs.Point));
            }
        }

        void InputDetector_Scrolled(object sender, ScrolledEventArgs eventArgs) {

            var sensitivity = _getScrollingSensitivity();
            var scaledScrollDelta = new Vector2(
                eventArgs.ScrollDelta.x * sensitivity,
                eventArgs.ScrollDelta.y * sensitivity
            );
            _scrollIfNeeded(scaledScrollDelta, eventArgs.Point);
        }

        void _disableHoveringIfNeeded(bool native2DModePreferred) {

            #if (UNITY_IOS || UNITY_WSA) && !VUPLEX_NO_DISABLING_HOVER_FOR_PERFORMANCE
                if (!HoveringEnabled) {
                    return;
                }
                if (native2DModePreferred) {
                    // Hovering isn't detected in Native 2D Mode, so logging a warning is unnecessary.
                    return;
                }
                HoveringEnabled = false;
                if (!_loggedHoverWarning) {
                    _loggedHoverWarning = true;
                    WebViewLogger.LogWarning("WebViewPrefab.HoveringEnabled is automatically set to false by default on iOS and UWP in order to optimize performance. However, you can override this by adding the scripting symbol VUPLEX_NO_DISABLING_HOVER_FOR_PERFORMANCE in player settings. For more info, see <em>https://support.vuplex.com/articles/hover-and-drag-limitations</em>.");
                }
            #endif
        }

        void _movePointerIfNeeded(Vector2 point) {

            var webViewWithMovablePointer = WebView as IWithMovablePointer;
            if (webViewWithMovablePointer == null) {
                return;
            }
            if (point != _previousMovePointerPoint) {
                _previousMovePointerPoint = point;
                webViewWithMovablePointer.MovePointer(point);
            }
        }

        void OnDestroy() {

            if (WebView != null && !WebView.IsDisposed) {
                WebView.Dispose();
            }
            Destroy();
            // Unity doesn't automatically destroy materials and textures
            // when the GameObject is destroyed.
            if (_viewMaterial != null) {
                Destroy(_viewMaterial.mainTexture);
                Destroy(_viewMaterial);
            }
            if (_videoMaterial != null) {
                Destroy(_videoMaterial.mainTexture);
                Destroy(_videoMaterial);
            }
        }

        void _scrollIfNeeded(Vector2 scrollDelta, Vector2 point) {

            // scrollDelta can be zero when the user drags the cursor off the screen.
            if (!ScrollingEnabled || WebView == null || scrollDelta == Vector2.zero) {
                return;
            }
            WebView.Scroll(scrollDelta, point);
            var handler = Scrolled;
            if (handler != null) {
                handler(this, new ScrolledEventArgs(scrollDelta, point));
            }
        }

        protected abstract void _setVideoLayerPosition(Rect videoRect);

        void _setVideoRect(Rect videoRect) {

            if (_videoLayer == null) {
                return;
            }
            _view.SetCutoutRect(videoRect);
            _setVideoLayerPosition(videoRect);
            // This code applies a cropping rect to the video layer's shader based on what part of the video (if any)
            // falls outside of the viewport and therefore needs to be hidden. Note that the dimensions here are divided
            // by the videoRect's width or height, because in the videoLayer shader, the width of the videoRect is 1
            // and the height is 1 (i.e. the dimensions are normalized).
            float videoRectXMin = Math.Max(0, - 1 * videoRect.x / videoRect.width);
            float videoRectYMin = Math.Max(0, -1 * videoRect.y / videoRect.height);
            float videoRectXMax = Math.Min(1, (1 - videoRect.x) / videoRect.width);
            float videoRectYMax = Math.Min(1, (1 - videoRect.y) / videoRect.height);
            var videoCropRect = Rect.MinMaxRect(videoRectXMin, videoRectYMin, videoRectXMax, videoRectYMax);
            if (videoCropRect == new Rect(0, 0, 1, 1)) {
                // The entire video rect fits within the viewport, so set the cropt rect to zero to disable it.
                videoCropRect = new Rect(0, 0, 0, 0);
            }
            _videoLayer.SetCropRect(videoCropRect);
        }

        void _throwExceptionIfInitialized() {

            if (WebView != null) {
                throw new InvalidOperationException("Init() cannot be called on a WebViewPrefab that has already been initialized.");
            }
        }

        void Update() {

            // Check if LogConsoleMessages is changed from false to true at runtime.
            if (LogConsoleMessages && !_consoleMessageLoggedHandlerAttached && WebView != null) {
                _consoleMessageLoggedHandlerAttached = true;
                WebView.ConsoleMessageLogged += WebView_ConsoleMessageLogged;
            }
        }

        void WebView_ConsoleMessageLogged(object sender, ConsoleMessageEventArgs eventArgs) {

            if (!LogConsoleMessages) {
                return;
            }
            var message = "[Web Console] " + eventArgs.Message;
            if (eventArgs.Source != null) {
                message += String.Format(" ({0}:{1})", eventArgs.Source, eventArgs.Line);
            }
            switch (eventArgs.Level) {
                case ConsoleMessageLevel.Error:
                    WebViewLogger.LogError(message, false);
                    break;
                case ConsoleMessageLevel.Warning:
                    WebViewLogger.LogWarning(message, false);
                    break;
                default:
                    WebViewLogger.Log(message, false);
                    break;
            }
        }
    }
}
