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

namespace Vuplex.WebView.Internal {

    /// <summary>
    /// XR-related utility methods used internally by 3D WebView.
    /// </summary>
    public static class XRUtils {

        public static XRSettingsWrapper XRSettings {
            get {
                return XRSettingsWrapper.Instance;
            }
        }

        public static bool SdkIsActive(string sdkNameFragment) {

            // This approach is taken because the legacy Oculus XR plugin identifies itself as "Oculus", but
            // the new XR plugin shows up two devices named "oculus input" and "oculus display". Similarly,
            // The MockHMD plugin used to identify itself as "MockHMD" but now it shows up as "MockHMD Head Tracking"
            // and "MockHMD Display".
            return XRSettings.loadedDeviceName.ToLower().Contains(sdkNameFragment.ToLower());
        }

        public static bool SinglePassRenderingIsEnabled {
            get {
                // For some headsets like HTC Vive Focus, XRSettings.eyeTextureDesc.vrUsage returns a value
                // other than VRTextureUsage.TwoEyes, so the VUPLEX_FORCE_SINGLE_PASS scripting symbol can be
                // used to force single pass in that scenario.
                #if VUPLEX_FORCE_SINGLE_PASS
                    return XRSettings.enabled;
                #elif UNITY_2017_2_OR_NEWER
                    return XRSettings.enabled && XRSettings.eyeTextureDesc.vrUsage == VRTextureUsage.TwoEyes;
                #else
                    return false;
                #endif
            }
        }
    }
}
