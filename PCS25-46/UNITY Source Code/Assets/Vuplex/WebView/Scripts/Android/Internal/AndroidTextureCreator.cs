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
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Rendering;

namespace Vuplex.WebView.Internal {

    struct TextureCreatorInvocation {
        public int id;
        public int nativeWidth;
        public int nativeHeight;
        public Action<Texture2D> callback;
    }

    public class AndroidTextureCreator : MonoBehaviour {

        public static AndroidTextureCreator Instance {
            get {
                if (!_instance) {
                    _instance = (AndroidTextureCreator) new GameObject("AndroidTextureCreator").AddComponent<AndroidTextureCreator>();
                    DontDestroyOnLoad(_instance.gameObject);
                }
                return _instance;
            }
        }

        public void CreateTexture(float width, float height, Action<Texture2D> callback) {

            var error = VXUtils.GetGraphicsApiErrorMessage(SystemInfo.graphicsDeviceType, new GraphicsDeviceType[] { GraphicsDeviceType.OpenGLES3, GraphicsDeviceType.OpenGLES2 });
            if (error != null) {
                throw new SettingsException(error);
            }
            // Textures must be created on the render thread, so we send the arguments to the
            // native code, which queues the invocation so that the texture can be created on
            // the next render pass.
            var invocation = new TextureCreatorInvocation {
                // Just use the first 8 bytes of the guid to fit into a uint32
                id = int.Parse(Guid.NewGuid().ToString().Split(new char[] {'-'})[0], System.Globalization.NumberStyles.HexNumber),
                nativeWidth = _convertUnityUnitsToPixels(width),
                nativeHeight = _convertUnityUnitsToPixels(height),
                callback = callback
            };
            _pendingInvocations.Add(invocation);
            _invocationIdsToTrigger.Add(invocation.id);
            WebView_addCreateTextureInvocation(invocation.id, invocation.nativeWidth, invocation.nativeHeight);
        }

        static AndroidTextureCreator _instance;
        List<int> _invocationIdsToTrigger = new List<int>();
        List<TextureCreatorInvocation> _pendingInvocations = new List<TextureCreatorInvocation>();
        readonly WaitForEndOfFrame _waitForEndOfFrame = new WaitForEndOfFrame();

        IEnumerator _callPluginOncePerFrame() {

            while (true) {
                yield return _waitForEndOfFrame;

                if (_invocationIdsToTrigger.Count > 0) {
                    foreach (var invocationId in _invocationIdsToTrigger) {
                        GL.IssuePluginEvent(WebView_getCreateTextureFunction(), invocationId);
                    }
                    _invocationIdsToTrigger.Clear();
                }
            }
        }

        int _convertUnityUnitsToPixels(float unityUnits) {

            return (int)(unityUnits * Config.NumberOfPixelsPerUnityUnit);
        }

        /// <summary>
        /// The native plugin invokes this method.
        /// </summary>
        void HandleTextureCreated(string parameterString) {

            var parameters = parameterString.Split(new char[]{';'});
            var invocationId = int.Parse(parameters[0]);
            var nativeTexture = new IntPtr(int.Parse(parameters[1]));
            var invocation = _pendingInvocations.Find(i => i.id == invocationId);
            _pendingInvocations.Remove(invocation);
            Texture2D texture = Texture2D.CreateExternalTexture(
                invocation.nativeWidth,
                invocation.nativeHeight,
                TextureFormat.RGBA32,
                false,
                false,
                nativeTexture
            );
            invocation.callback(texture);
        }

        void Start() {

            StartCoroutine(_callPluginOncePerFrame());
        }

        [DllImport("VuplexWebViewAndroid")]
        static extern void WebView_addCreateTextureInvocation(int invocationId, int width, int height);

        [DllImport("VuplexWebViewAndroid")]
        static extern IntPtr WebView_getCreateTextureFunction();
    }
}
#endif
