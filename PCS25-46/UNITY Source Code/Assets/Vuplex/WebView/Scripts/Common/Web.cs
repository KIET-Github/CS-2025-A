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

#if NET_4_6 || NET_STANDARD_2_0
    using System.Threading.Tasks;
#endif

namespace Vuplex.WebView {

    /// <summary>
    /// `Web` is the top-level static class for the 3D WebView plugin.
    /// It contains static methods for configuring the module and creating resources.
    /// </summary>
    /// <seealso cref="WebViewPrefab"/>
    /// <seealso cref="CanvasWebViewPrefab"/>
    /// <seealso cref="IWebView"/>
    public static class Web {

        /// <summary>
        /// Gets the default 3D WebView plugin type among those
        /// installed for the current platform.
        /// </summary>
        public static WebPluginType DefaultPluginType {
            get {
                return _pluginFactory.GetPlugin().Type;
            }
        }

        /// <summary>
        /// Clears all data that persists between webview instances,
        /// including cookies, storage, and cached resources.
        /// </summary>
        /// <remarks>
        /// Important notes:
        /// <list type="bullet">
        ///   <item>On Windows and macOS, this method can only be called prior to initializing any webviews.</item>
        ///   <item>On Universal Windows Platform, this method is unable to clear cookies due to a UWP limitation.</item>
        /// </list>
        /// </remarks>
        public static void ClearAllData() {

            _pluginFactory.GetPlugin().ClearAllData();
        }

    #if NET_4_6 || NET_STANDARD_2_0
        /// <summary>
        /// Creates a material and texture that a webview can use for rendering.
        /// </summary>
        /// <remarks>
        /// Note that WebViewPrefab and CanvasWebViewPrefab take care of material creation for you, so you only need
        /// to call this method directly if you need to create an IWebView instance outside of a prefab with
        /// Web.CreateWebView().
        /// </remarks>
        public static Task<Material> CreateMaterial() {

            var task = new TaskCompletionSource<Material>();
            _pluginFactory.GetPlugin().CreateMaterial(task.SetResult);
            return task.Task;
        }
    #endif

        [Obsolete("The callback-based CreateMaterial(Action) version of this method is now deprecated. Please switch to the Task-based CreateMaterial() version instead. If you prefer using a callback instead of awaiting the Task, you can still use a callback like this: CreateMaterial().ContinueWith(result => {...})")]
        public static void CreateMaterial(Action<Material> callback) {

            _pluginFactory.GetPlugin().CreateMaterial(callback);
        }

        /// <summary>
        /// Like CreateMaterial(), except it creates a material that a webview
        /// can use for rendering video on iOS. On other platforms, this method
        /// returns `null`.
        /// </summary>
        public static void CreateVideoMaterial(Action<Material> callback) {

            _pluginFactory.GetPlugin().CreateVideoMaterial(callback);
        }

    #if NET_4_6 || NET_STANDARD_2_0
        /// <summary>
        /// Creates a special texture that a webview can use for rendering, using the given
        /// width and height in Unity units (not pixels). The webview plugin automatically
        /// resizes a texture when it initializes or resizes a webview, so in practice, you
        /// can simply use the dimensions of 1x1 like `CreateTexture(1, 1)`.
        /// </summary>
        /// <remarks>
        /// Note that the WebViewPrefab takes care of texture creation for you, so you only need
        /// to call this method directly if you need to create an IWebView instance outside of a prefab with
        /// Web.CreateWebView().
        /// </remarks>
        public static Task<Texture2D> CreateTexture(float width, float height) {

            var task = new TaskCompletionSource<Texture2D>();
            _pluginFactory.GetPlugin().CreateTexture(width, height, task.SetResult);
            return task.Task;
        }
    #endif

        [Obsolete("The callback-based CreateTexture(Action) version of this method is now deprecated. Please switch to the Task-based CreateTexture() version instead. If you prefer using a callback instead of awaiting the Task, you can still use a callback like this: CreateTexture(width, height).ContinueWith(result => {...})")]
        public static void CreateTexture(float width, float height, Action<Texture2D> callback) {

            _pluginFactory.GetPlugin().CreateTexture(width, height, callback);
        }

        /// <summary>
        /// Creates a new webview in a platform-agnostic way. After a webview
        /// is created, it must be initialized by calling one of its Init()
        /// methods.
        /// </summary>
        /// <remarks>
        /// Note that WebViewPrefab takes care of creating and managing
        /// an IWebView instance for you, so you only need to call this method directly
        /// if you need to create an IWebView instance outside of a prefab
        /// (for example, to connect it to your own custom GameObject).
        /// </remarks>
        /// <example>
        /// <code>
        /// var material = await Web.CreateMaterial();
        /// // Set the material attached to this GameObject so that it can display the web content.
        /// GetComponent&lt;Renderer>().material = material;
        /// var webView = Web.CreateWebView();
        /// webView.Init((Texture2D)material.mainTexture, 1, 1);
        /// webView.LoadUrl("https://vuplex.com");
        /// </code>
        /// </example>
        public static IWebView CreateWebView() {

            return _pluginFactory.GetPlugin().CreateWebView();
        }

        /// <summary>
        /// Like CreateWebView(), except an array of preferred plugin types can be
        /// provided to override which 3D WebView plugin is used in the case where
        /// multiple plugins are installed for the same build platform.
        /// </summary>
        /// <remarks>
        /// Currently, Android is the only platform that supports multiple 3D WebView
        /// plugins: WebPluginType.Android and WebPluginType.AndroidGecko. If both
        /// plugins are installed in the same project, WebPluginType.AndroidGecko will be used by default.
        /// However, you can override this to force WebPluginType.Android to be used instead by passing
        /// `new WebPluginType[] { WebPluginType.Android }`.
        /// </remarks>
        public static IWebView CreateWebView(WebPluginType[] preferredPlugins) {

            return _pluginFactory.GetPlugin(preferredPlugins).CreateWebView();
        }

        /// <summary>
        /// Enables remote debugging. For more info, please
        /// see [this article on remote debugging](https://support.vuplex.com/articles/how-to-debug-web-content).
        /// </summary>
        public static void EnableRemoteDebugging() {

            _pluginFactory.GetPlugin().EnableRemoteDebugging();
        }

        /// <summary>
        /// Sets whether pages can autoplay video with audio.
        /// The default is disabled.
        /// </summary>
        /// <remarks>
        /// Important notes:
        /// <list type="bullet">
        ///   <item>
        ///     On Windows and macOS, this method can only be called prior to
        ///     initializing any webviews.
        ///   </item>
        ///   <item>
        ///     This method works for every package except for 3D WebView for UWP,
        ///     because the underlying UWP WebView control doesn't allow autoplaying
        ///     video with audio.
        ///   </item>
        /// </list>
        /// </remarks>
        public static void SetAutoplayEnabled(bool enabled) {

            _pluginFactory.GetPlugin().SetAutoplayEnabled(enabled);
        }

        /// <summary>
        /// By default, browsers block https URLs with invalid SSL certificates
        /// from being loaded. However, this method can be used to ignore
        /// certificate errors.
        /// </summary>
        /// <remarks>
        /// Important notes:
        /// <list type="bullet">
        ///   <item>
        ///     On Windows and macOS, this method can only be called prior to
        ///     initializing any webviews.
        ///   </item>
        ///   <item>
        ///     This method works for every package except for 3D WebView for UWP.
        ///     For UWP, certificates must be [whitelisted in the Package.appxmanifest file](https://www.suchan.cz/2015/10/displaying-https-page-with-invalid-certificate-in-uwp-webview/).
        ///   </item>
        /// </list>
        /// </remarks>
        public static void SetIgnoreCertificateErrors(bool ignore) {

            _pluginFactory.GetPlugin().SetIgnoreCertificateErrors(ignore);
        }

        [Obsolete("Web.SetTouchScreenKeyboardEnabled() is now deprecated. Please switch to using the NativeOnScreenKeyboardEnabled property of WebViewPrefab / CanvasWebViewPrefab or the IWithNativeOnScreenKeyboard interface.")]
        public static void SetTouchScreenKeyboardEnabled(bool enabled) {

            var pluginWithTouchScreenKeyboard = _pluginFactory.GetPlugin() as IPluginWithTouchScreenKeyboard;
            if (pluginWithTouchScreenKeyboard != null) {
                pluginWithTouchScreenKeyboard.SetTouchScreenKeyboardEnabled(enabled);
            }
        }

        /// <summary>
        /// Controls whether data like cookies, localStorage, and cached resources
        /// is persisted between webview instances. The default is `true`, but this
        /// can be set to `false` to achieve an "incognito mode".
        /// </summary>
        /// <remarks>
        /// On Windows and macOS, this method can only be called prior to
        /// initializing any webviews.
        /// </remarks>
        public static void SetStorageEnabled(bool enabled) {

            _pluginFactory.GetPlugin().SetStorageEnabled(enabled);
        }

        /// <summary>
        /// Globally configures all webviews to use a mobile or desktop
        /// [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).
        /// By default, webviews use the browser engine's default User-Agent, but you
        /// can force them to use a mobile User-Agent by calling `Web.SetUserAgent(true)` or a
        /// desktop User-Agent with `Web.SetUserAgent(false)`.
        /// </summary>
        /// <remarks>
        /// On Windows and macOS, this method can only be called prior to
        /// initializing any webviews.
        /// </remarks>
        /// <seealso cref="IWithSettableUserAgent"/>
        public static void SetUserAgent(bool mobile) {

            _pluginFactory.GetPlugin().SetUserAgent(mobile);
        }

        /// <summary>
        /// Globally configures all webviews to use a custom
        /// [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).
        /// </summary>
        /// <remarks>
        /// On Windows and macOS, this method can only be called prior to
        /// initializing any webviews.
        /// </remarks>
        /// <seealso cref="IWithSettableUserAgent"/>
        public static void SetUserAgent(string userAgent) {

            _pluginFactory.GetPlugin().SetUserAgent(userAgent);
        }

        static internal void SetPluginFactory(WebPluginFactory pluginFactory) {

            _pluginFactory = pluginFactory;
        }

        static WebPluginFactory _pluginFactory = new WebPluginFactory();
    }
}
