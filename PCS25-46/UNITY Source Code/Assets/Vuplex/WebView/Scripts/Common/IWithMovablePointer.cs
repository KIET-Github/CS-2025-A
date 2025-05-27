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
using UnityEngine;

namespace Vuplex.WebView {

    /// <summary>
    /// An interface implemented by a webview if it supports `MovePointer`,
    /// which can be used to implement hover or drag interactions.
    /// </summary>
    /// <remarks>
    /// For information on the limitations of hover and drag interactions on iOS and UWP, please see
    /// https://support.vuplex.comarticles/hover-and-drag-limitations.
    /// <remarks>
    /// <example>
    /// <code>
    /// var webViewWithMovablePointer = webViewPrefab.WebView as IWithMovablePointer;
    /// if (webViewWithMovablePointer != null) {
    ///     // Move the pointer to (250px, 100px) in the web page.
    ///     var normalizedPoint = new Vector2(250, 100) / webViewPrefab.WebView.SizeInPixels;
    ///     webViewWithMovablePointer.MovePointer(normalizedPoint)
    /// }
    /// </code>
    /// </example>
    public interface IWithMovablePointer {

        /// <summary>
        /// Moves the pointer to the given point in the webpage.
        /// </summary>
        /// <remarks>
        /// This can be used to trigger hover effects in the page or can be used
        /// in conjunction with the IWithPointerDownAndUp interface to implement
        /// drag interactions.
        /// </remarks>
        /// <param name="point">
        /// The x and y components of the point are values in the range of [0, 1] that
        /// are normalized to the webview's width and height. For example,
        /// `point.x = xInPixels / webView.SizeInPixels.x`. Like in the browser,
        /// the origin is in the upper-left corner, the positive direction of the y-axis
        /// is down, and the positive direction of the x-axis is right.
        /// </param>
        void MovePointer(Vector2 point);
    }
}
