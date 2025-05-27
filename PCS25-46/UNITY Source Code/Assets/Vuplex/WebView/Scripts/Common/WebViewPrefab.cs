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
using System;
using UnityEngine;
using UnityEngine.EventSystems;
using Vuplex.WebView.Internal;

namespace Vuplex.WebView {

    /// <summary>
    /// WebViewPrefab is a prefab that makes it easy to view and interact with an IWebView in 3D world space.
    /// It takes care of creating an IWebView, displaying its texture, and handling pointer interactions
    /// from the user, like clicking, dragging, and scrolling. So, all you need to do is specify a URL or HTML to load,
    /// and then the user can view and interact with it. For use in a Canvas, see CanvasWebViewPrefab instead.
    /// </summary>
    /// <remarks>
    /// There are two ways to create a WebViewPrefab:
    /// <list type="number">
    ///   <item>
    ///     By dragging the WebViewPrefab.prefab file into your scene via the editor and setting its "Initial URL" property.
    ///   </item>
    ///   <item>
    ///     Or by creating an instance programmatically with WebViewPrefab.Instantiate(), waiting for
    ///     it to initialize, and then calling methods on its WebView property, like LoadUrl().
    ///   </item>
    /// </list>
    /// <para>
    /// If your use case requires a high degree of customization, you can instead create an IWebView
    /// outside of the prefab with Web.CreateWebView().
    /// </para>
    /// See also:
    /// <list type="bullet">
    ///   <item>CanvasWebViewPrefab: https://developer.vuplex.com/webview/CanvasWebViewPrefab</item>
    ///   <item>How clicking and scrolling works: https://support.vuplex.com/articles/clicking</item>
    ///   <item>IWebView: https://developer.vuplex.com/webview/IWebView</item>
    ///   <item>Web (static methods): https://developer.vuplex.com/webview/Web</item>
    /// </list>
    /// </remarks>
    [HelpURL("https://developer.vuplex.com/webview/WebViewPrefab")]
    public partial class WebViewPrefab : BaseWebViewPrefab {

        /// <summary>
        /// Gets the prefab's collider.
        /// </summary>
        public Collider Collider {
            get {
                return _view.GetComponent<Collider>();
            }
        }

        /// <summary>
        /// Sets the webview's initial resolution in pixels per Unity unit.
        /// You can change the resolution to make web content appear larger or smaller.
        /// For more information on scaling web content, see
        /// [this support article](https://support.vuplex.com/articles/how-to-scale-web-content).
        /// </summary>
        [Label("Initial Resolution (px / Unity unit)")]
        [Tooltip("You can change this to make web content appear larger or smaller.")]
        [HideInInspector]
        public float InitialResolution = 1300;

        /// <summary>
        /// Determines whether the operating system's native on-screen keyboard is
        /// automatically shown when a text input in the webview is focused. The default for
        /// WebViewPrefab is `false`.
        /// </summary>
        /// <remarks>
        /// The native on-screen keyboard is only supported for the following packages:
        /// <list type="bullet">
        ///   <item>3D WebView for Android (non-Gecko)</item>
        ///   <item>3D WebView for iOS</item>
        /// </list>
        /// </remarks>
        [Label("Native On-Screen Keyboard (Android and iOS only)")]
        [Header("Platform-specific")]
        [Tooltip("Determines whether the operating system's native on-screen keyboard is automatically shown when a text input in the webview is focused. The native on-screen keyboard is only supported for the following packages:\n• 3D WebView for Android (non-Gecko)\n• 3D WebView for iOS")]
        public bool NativeOnScreenKeyboardEnabled;

        [Obsolete("The static WebViewPrefab.ScrollSensitivity property is obsolete. Please use one of the following instance properties instead: WebViewPrefab.ScrollingSensitivity or CanvasWebViewPrefab.ScrollingSensitivity.")]
        public static float ScrollSensitivity { get; set; }

        /// <summary>
        /// Determines the scroll sensitivity. The default sensitivity for WebViewPrefab is `0.005`.
        /// </summary>
        [HideInInspector]
        public float ScrollingSensitivity = 0.005f;

        /// <summary>
        /// Creates a new instance with the given dimensions in Unity units.
        /// </summary>
        /// <remarks>
        /// The WebView property is available after initialization completes,
        /// which is indicated by WaitUntilInitialized() method.
        /// A webview's default resolution is 1300px per Unity unit but can be
        /// changed with SetResolution().
        /// </remarks>
        /// <example>
        /// <code>
        /// // Create a 0.5 x 0.5 instance
        /// var webViewPrefab = WebViewPrefab.Instantiate(0.5f, 0.5f);
        /// // Position the prefab how we want it
        /// webViewPrefab.transform.parent = transform;
        /// webViewPrefab.transform.localPosition = new Vector3(0, 0f, 0.5f);
        /// webViewPrefab.transform.LookAt(transform);
        /// // Load a URL once the prefab finishes initializing
        /// await webViewPrefab.WaitUntilInitialized();
        /// webViewPrefab.WebView.LoadUrl("https://vuplex.com");
        /// </code>
        /// </example>
        public static WebViewPrefab Instantiate(float width, float height) {

            return Instantiate(width, height, new WebViewOptions());
        }

        /// <summary>
        /// Like Instantiate(float, float), except it also accepts an object
        /// of options flags that can be used to alter the generated webview's behavior.
        /// </summary>
        public static WebViewPrefab Instantiate(float width, float height, WebViewOptions options) {

            var prefabPrototype = (GameObject) Resources.Load("WebViewPrefab");
            var gameObject = (GameObject) Instantiate(prefabPrototype);
            var webViewPrefab = gameObject.GetComponent<WebViewPrefab>();
            webViewPrefab._sizeForInitialization = new Vector2(width, height);
            webViewPrefab._options = options;
            return webViewPrefab;
        }

        /// <summary>
        /// Like Instantiate(float, float), except it initializes the instance with an existing, initialized
        /// IWebView instance. This causes the WebViewPrefab to use the existing
        /// IWebView instance instead of creating a new one.
        /// </summary>
        public static WebViewPrefab Instantiate(IWebView webView) {

            var prefabPrototype = (GameObject) Resources.Load("WebViewPrefab");
            var gameObject = (GameObject) Instantiate(prefabPrototype);
            var webViewPrefab = gameObject.GetComponent<WebViewPrefab>();
            webViewPrefab.SetWebViewForInitialization(webView);
            webViewPrefab._sizeForInitialization = webView.Size;
            return webViewPrefab;
        }

        [Obsolete("WebViewPrefab.Init() has been removed. The WebViewPrefab script now initializes itself automatically, so Init() no longer needs to be called.", true)]
        public void Init() {}

        [Obsolete("WebViewPrefab.Init() has been removed. The WebViewPrefab script now initializes itself automatically, so Init() no longer needs to be called.", true)]
        public void Init(float width, float height) {}

        /// <summary>
        /// Like `Init(float, float)`, except it also accepts an object
        /// of options flags that can be used to alter the webview's behavior.
        /// </summary>
        [Obsolete("WebViewPrefab.Init() has been removed. The WebViewPrefab script now initializes itself automatically, so Init() no longer needs to be called.", true)]
        public void Init(float width, float height, WebViewOptions options) {}

        [Obsolete("WebViewPrefab.Init() has been removed. The WebViewPrefab script now initializes itself automatically, so Init() no longer needs to be called. Please use WebViewPrefab.SetWebViewForInitialization(IWebView) instead.", true)]
        public void Init(IWebView webView) {}

        /// <summary>
        /// Converts the given world position to a normalized screen point.
        /// </summary>
        /// <returns>
        /// A point where the x and y components are normalized
        /// values in the range of [0, 1].
        /// </returns>
        public Vector2 ConvertToScreenPoint(Vector3 worldPosition) {

            var localPosition = _viewResizer.transform.InverseTransformPoint(worldPosition);
            return new Vector2(1 - localPosition.x, -1 * localPosition.y);
        }

        /// <summary>
        /// Resizes the prefab mesh and webview to the given dimensions in Unity units.
        /// </summary>
        /// <remarks>
        /// A webview's default resolution is 1300px per Unity unit but can be changed
        /// with `IWebView.SetResolution()`.
        /// </remarks>
        public void Resize(float width, float height) {

            if (WebView != null) {
                WebView.Resize(width, height);
            }
            _setViewSize(width, height);
        }

        Vector2 _sizeForInitialization = Vector2.zero;
        [SerializeField]
        [HideInInspector]
        Transform _videoRectPositioner;
        [SerializeField]
        [HideInInspector]
        protected Transform _viewResizer;

        // Partial method implemented by various 3D WebView packages
        // to provide platform-specific warnings.
        partial void OnInit();

        protected override Vector2 _convertRatioPointToUnityUnits(Vector2 point) {

            var unityUnitsX = _viewResizer.transform.localScale.x * point.x;
            var unityUnitsY = _viewResizer.transform.localScale.y * point.y;
            return new Vector2(unityUnitsX, unityUnitsY);
        }

        protected override float _getInitialResolution() {

            return InitialResolution;
        }

        protected override float _getScrollingSensitivity() {

            return ScrollingSensitivity;
        }

        protected override bool _getNativeOnScreenKeyboardEnabled() {

            return NativeOnScreenKeyboardEnabled;
        }

        protected override ViewportMaterialView _getVideoLayer() {

            return _videoRectPositioner?.GetComponentInChildren<ViewportMaterialView>();
        }

        protected override ViewportMaterialView _getView() {

            return transform.Find("WebViewPrefabResizer/WebViewPrefabView").GetComponent<ViewportMaterialView>();
        }

        void _initWebViewPrefab() {

            OnInit();

            #if VUPLEX_XR_INTERACTION_TOOLKIT
                WebViewLogger.LogWarning("It looks like you're using a WebViewPrefab with XR Interaction Toolkit. Please use a CanvasWebViewPrefab inside a world space Canvas instead. For more information, please see <em>https://support.vuplex.com/articles/xr-interaction-toolkit</em>.");
            #endif

            #if UNITY_ANDROID && UNITY_2018_2_OR_NEWER
                if (UnityEngine.Rendering.GraphicsSettings.useScriptableRenderPipelineBatching) {
                    WebViewLogger.LogError("URP settings error: \"SRP Batcher\" is enabled in Universal Render Pipeline (URP) settings, but URP for Android has an issue that prevents 3D WebView's textures from showing up outside of a Canvas. Please either go to \"UniversalRenderPipelineAsset\" -> \"Advanced\" and disable SRP Batcher or switch to using CanvasWebViewPrefab.");
                }
            #endif

            if (_sizeForInitialization == Vector2.zero) {
                // The size was set via the editor instead of through arguments to Instantiate().
                _sizeForInitialization = transform.localScale;
                _resetLocalScale();
            }
            _viewResizer = transform.GetChild(0);
            _videoRectPositioner = _viewResizer.Find("VideoRectPositioner");
            _setViewSize(_sizeForInitialization.x, _sizeForInitialization.y);
            _init(_sizeForInitialization);
        }

        /// <summary>
        /// The top-level WebViewPrefab object's scale must be (1, 1),
        /// so the scale that was set via the editor is transferred from WebViewPrefab
        /// to WebViewPrefabResizer, and WebViewPrefab is moved to compensate
        /// for how WebViewPrefabResizer is moved in _setViewSize.
        /// </summary>
        void _resetLocalScale() {

            var localScale = transform.localScale;
            var localPosition = transform.localPosition;
            transform.localScale = new Vector3(1, 1, localScale.z);
            var offsetMagnitude = 0.5f * localScale.x;
            transform.localPosition = transform.localPosition + Quaternion.Euler(transform.localEulerAngles) * new Vector3(offsetMagnitude, 0, 0);
        }

        protected override void _setVideoLayerPosition(Rect videoRect) {

            // The origins of the prefab and the video rect are in their top-right
            // corners instead of their top-left corners.
            _videoRectPositioner.localPosition = new Vector3(
                1 - (videoRect.x + videoRect.width),
                -1 * videoRect.y,
                _videoRectPositioner.localPosition.z
            );
            _videoRectPositioner.localScale = new Vector3(videoRect.width, videoRect.height, _videoRectPositioner.localScale.z);
        }

        void _setViewSize(float width, float height) {

            var depth = _viewResizer.localScale.z;
            _viewResizer.localScale = new Vector3(width, height, depth);
            var localPosition = _viewResizer.localPosition;
            // Set the view resizer so that its middle aligns with the middle of this parent class's gameobject.
            localPosition.x = width * -0.5f;
            _viewResizer.localPosition = localPosition;
        }

        void Start() {

            _initWebViewPrefab();
        }
    }
}
