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
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Rendering;

namespace Vuplex.WebView.Internal {

    /// <summary>
    /// Static utility methods used internally by 3D WebView.
    /// </summary>
    /// <remarks>
    /// This class used to be named Utils, but since Utils is a common class name,
    /// if the user's project contained a class named Utils in the global namespace,
    /// it would break the 3D WebView classes that use this class.
    /// </remarks>
    public static class VXUtils {

        public static byte[] ConvertAndroidByteArray(AndroidJavaObject arrayObject) {

            // Unity 2019.1 and newer logs a warning that converting from byte[] is obsolete
            // but older versions are incapable of converting from sbyte[].
            #if UNITY_2019_1_OR_NEWER
                return (byte[])(Array)AndroidJNIHelper.ConvertFromJNIArray<sbyte[]>(arrayObject.GetRawObject());
            #else
                return AndroidJNIHelper.ConvertFromJNIArray<byte[]>(arrayObject.GetRawObject());
            #endif
        }

        public static Material CreateDefaultMaterial() {

            // Construct a new material, because Resources.Load<T>() returns a singleton.
            return new Material(Resources.Load<Material>("DefaultViewportMaterial"));
        }

        public static void CreateDefaultTexture(float width, float height, Action<Texture2D> callback) {

            int nativeWidth = (int)(width * Config.NumberOfPixelsPerUnityUnit);
            int nativeHeight = (int)(height * Config.NumberOfPixelsPerUnityUnit);
            VXUtils.ThrowExceptionIfAbnormallyLarge(nativeWidth, nativeHeight);
            var texture = new Texture2D(
                nativeWidth,
                nativeHeight,
                TextureFormat.RGBA32,
                false,
                false
            );
            #if UNITY_2020_2_OR_NEWER
                // In Unity 2020.2, Unity's internal TexturesD3D11.cpp class on Windows logs an error if
                // UpdateExternalTexture() is called on a Texture2D created from the constructor
                // rather than from Texture2D.CreateExternalTexture(). So, rather than returning
                // the original Texture2D created via the constructor, we return a copy created
                // via CreateExternalTexture(). This approach is only used for 2020.2 and newer because
                // it doesn't work in 2018.4 and instead causes a crash.
                texture = Texture2D.CreateExternalTexture(
                    nativeWidth,
                    nativeHeight,
                    TextureFormat.RGBA32,
                    false,
                    false,
                    texture.GetNativeTexturePtr()
                );
            #endif
            // Invoke the callback asynchronously in order to match the async
            // behavior that's required for Android.
            Dispatcher.RunOnMainThread(() => callback(texture));
        }

        public static string GetGraphicsApiErrorMessage(GraphicsDeviceType activeGraphicsApi, GraphicsDeviceType[] acceptableGraphicsApis) {

            var isValid = Array.IndexOf(acceptableGraphicsApis, activeGraphicsApi) != -1;
            if (isValid) {
                return null;
            }
            var acceptableApiStrings = acceptableGraphicsApis.ToList().Select(api => api.ToString());
            var acceptableApisList = String.Join(" or ", acceptableApiStrings.ToArray());
            return String.Format("Unsupported graphics API: Vuplex 3D WebView requires {0} for this platform, but the selected graphics API is {1}. Please go to Player Settings and set \"Graphics APIs\" to {0}.", acceptableApisList, activeGraphicsApi);
        }

        public static void LogNative2DModeWarning(string methodName) {

            WebViewLogger.LogWarning(methodName + "() was called but will be ignored because it is not supported in Native 2D Mode.");
        }

        public static void ThrowExceptionIfAbnormallyLarge(int width, int height) {

            // Anything over 14.7 megapixels (5k) is almost certainly a mistake.
            if (width * height > 14700000) {
                throw new ArgumentException(String.Format("The application specified an abnormally large webview size ({0}px x {1}px), and webviews of this size are normally only created by mistake. A webview's default resolution is 1300px per Unity unit, so it's likely that you specified a large physical size by mistake or need to adjust the resolution. For more information, please see IWebView.SetResolution: https://developer.vuplex.com/webview/IWebView#SetResolution", width, height));
            }
        }
    }
}
