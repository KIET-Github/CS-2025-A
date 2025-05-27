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
#pragma warning disable CS0618
using System;
using UnityEngine;
using Vuplex.WebView.Internal;

namespace Vuplex.WebView {

    class AndroidWebPlugin : MonoBehaviour,
                             IWebPlugin,
                             IPluginWithTouchScreenKeyboard {

        public static AndroidWebPlugin Instance {
            get {
                if (_instance == null) {
                    _instance = (AndroidWebPlugin) new GameObject("AndroidWebPlugin").AddComponent<AndroidWebPlugin>();
                    DontDestroyOnLoad(_instance.gameObject);
                    #if UNITY_2017_2_OR_NEWER
                        if (SystemInfo.deviceName == "Oculus Quest 2") {
                            // The Quest 2's version of Chromium also has a bug where it often dispatches
                            // pointer events at the wrong coordinates when using the default pointer
                            // input system, so the alternative pointer input system must be used instead.
                            AndroidWebView.SetAlternativePointerInputSystemEnabled(true);
                        }
                    #endif
                }
                return _instance;
            }
        }

        public WebPluginType Type {
            get {
                return WebPluginType.Android;
            }
        }

        public void ClearAllData() {

            AndroidWebView.ClearAllData();
        }

        public void CreateTexture(float width, float height, Action<Texture2D> callback) {

            AndroidTextureCreator.Instance.CreateTexture(width, height, callback);
        }

        public void CreateMaterial(Action<Material> callback) {

            CreateTexture(1, 1, texture => {
                var materialName = _getMaterialName();
                // Construct a new material, because Resources.Load<T>() returns a singleton.
                var material = new Material(Resources.Load<Material>(materialName));
                material.mainTexture = texture;
                callback(material);
            });
        }

        public void CreateVideoMaterial(Action<Material> callback) {

            callback(null);
        }

        public virtual IWebView CreateWebView() {

            return AndroidWebView.Instantiate();
        }

        public void EnableRemoteDebugging() {

            WebViewLogger.Log("Remote debugging is enabled for Android. For instructions, please see https://support.vuplex.com/articles/how-to-debug-web-content#android.");
        }

        public void SetAutoplayEnabled(bool enabled) {

            AndroidWebView.SetAutoplayEnabled(enabled);
        }

        public void SetIgnoreCertificateErrors(bool ignore) {

            AndroidWebView.SetIgnoreCertificateErrors(ignore);
        }

        // Deprecated
        /// <see cref="IPluginWithTouchScreenKeyboard"/>
        public void SetTouchScreenKeyboardEnabled(bool enabled) {

            AndroidWebView.SetTouchScreenKeyboardEnabled(enabled);
        }

        public void SetStorageEnabled(bool enabled) {

            AndroidWebView.SetStorageEnabled(enabled);
        }

        public void SetUserAgent(bool mobile) {

            AndroidWebView.GloballySetUserAgent(mobile);
        }

        public void SetUserAgent(string userAgent) {

            AndroidWebView.GloballySetUserAgent(userAgent);
        }

        static AndroidWebPlugin _instance;

        string _getMaterialName() {

            return XRUtils.SinglePassRenderingIsEnabled ? "AndroidSinglePassViewportMaterial"
                                                        : "AndroidViewportMaterial";
        }

        /// <summary>
        /// Automatically pause web processing and media playback
        /// when the app is paused and resume it when the app is resumed.
        /// </summary>
        void OnApplicationPause(bool isPaused) {

            // See the documentation for AndroidWebView.PauseAll() for more info.
            #if !VUPLEX_ANDROID_DISABLE_AUTOMATIC_PAUSING
                if (isPaused) {
                    AndroidWebView.PauseAll();
                } else {
                    AndroidWebView.ResumeAll();
                }
            #endif
        }
    }
}
#endif
