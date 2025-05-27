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
namespace Vuplex.WebView.Internal {

    class Config {

        /// <summary>
        /// Used internally by 3D WebView to specify the default webview
        /// resolution. To change the resolution, use `WebViewPrefab.InitialResolution`
        /// or `IWebView.SetResolution()` instead of changing this value.
        /// </summary>
        public const int NumberOfPixelsPerUnityUnit = 1300;
    }
}
