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
#pragma warning disable CS0618
using System;
using System.IO;
using System.Linq;
using UnityEngine;
using UnityEditor;
using UnityEditor.Build;
using Vuplex.WebView.Internal;

namespace Vuplex.WebView.Editor {

    static class EditorUtils {

        public static void AssertThatOculusLowOverheadModeIsDisabled() {

            if (!EditorUtils.XRSdkIsEnabled("oculus")) {
                return;
            }
            var lowOverheadModeEnabled = false;
            #if VUPLEX_OCULUS
                // The Oculus XR plugin is installed
                Unity.XR.Oculus.OculusLoader oculusLoader = Unity.XR.Oculus.OculusSettings.CreateInstance<Unity.XR.Oculus.OculusLoader>();
                Unity.XR.Oculus.OculusSettings oculusSettings = oculusLoader.GetSettings();
                lowOverheadModeEnabled = oculusSettings.LowOverheadMode;
            #elif UNITY_2019_2_OR_NEWER && !UNITY_2020_1_OR_NEWER
                // VROculus.lowOverheadMode is only supported from Unity 2019.2 - 2019.4
                lowOverheadModeEnabled = PlayerSettings.VROculus.lowOverheadMode;
            #endif
            if (lowOverheadModeEnabled) {
                throw new BuildFailedException("XR settings error: Vuplex 3D WebView requires that \"Low Overhead Mode\" be disabled in Oculus XR settings. Please disable Low Overhead Mode in Oculus XR settings.");
            }
        }

        public static void AssertThatSrpBatcherIsDisabled() {

            #if UNITY_2018_2_OR_NEWER && !VUPLEX_DISABLE_SRP_WARNING
                if (UnityEngine.Rendering.GraphicsSettings.useScriptableRenderPipelineBatching) {
                    throw new BuildFailedException("URP settings error: \"SRP Batcher\" is enabled in Universal Render Pipeline (URP) settings, but URP for Android has an issue that prevents 3D WebView's textures from showing up outside of a Canvas. If the project uses a WebViewPrefab, please go to \"UniversalRenderPipelineAsset\" -> \"Advanced\" and disable SRP Batcher. If the project only uses CanvasWebViewPrefab and not WebViewPrefab, you can instead add the scripting symbol VUPLEX_DISABLE_SRP_WARNING to the project to ignore this warning.");
                }
            #endif
        }

        public static void CopyAndReplaceDirectory(string srcPath, string dstPath, bool ignoreMetaFiles = true) {

            if (Directory.Exists(dstPath)) {
                Directory.Delete(dstPath, true);
            }
            if (File.Exists(dstPath)) {
                File.Delete(dstPath);
            }
            Directory.CreateDirectory(dstPath);

            foreach (var file in Directory.GetFiles(srcPath)) {
                if (!ignoreMetaFiles || Path.GetExtension(file) != ".meta") {
                    File.Copy(file, Path.Combine(dstPath, Path.GetFileName(file)));
                }
            }
            foreach (var dir in Directory.GetDirectories(srcPath)) {
                CopyAndReplaceDirectory(dir, Path.Combine(dstPath, Path.GetFileName(dir)), ignoreMetaFiles);
            }
        }

        public static void DrawLink(string linkText, string url, int underlineLength) {

            var linkStyle = new GUIStyle {
                richText = true,
                padding = new RectOffset {
                    top = 2,
                    bottom = 2
                }
            };
            var linkClicked = GUILayout.Button(
                EditorUtils.TextWithColor(linkText, EditorUtils.GetLinkColor()),
                linkStyle
            );
            var linkRect = GUILayoutUtility.GetLastRect();
            EditorGUIUtility.AddCursorRect(linkRect, MouseCursor.Link);

            // Unity's editor GUI doesn't support underlines, so fake it.
            var underscores = new string[underlineLength];
            for (var i = 0; i < underlineLength; i++) {
                underscores[i] = "_";
            }
            var underline = String.Join("", underscores);

            GUI.Label(
                linkRect,
                EditorUtils.TextWithColor(underline, EditorUtils.GetLinkColor()),
                new GUIStyle {
                    richText = true,
                    padding = new RectOffset {
                        top = 4,
                        bottom = 2
                }
            });
            if (linkClicked) {
                Application.OpenURL(url);
            }
        }

        /// <summary>
        /// Returns the path to a given directory, searching for it if needed.
        /// If `directoryToSearch` isn't provided, `Application.dataPath` is used.
        /// </summary>
        public static string FindDirectory(string expectedPath, string directoryToSearch = null, string[] ignorePaths = null) {

            if (Directory.Exists(expectedPath)) {
                return expectedPath;
            }
            // The directory isn't in the expected location, so fall back to finding it.
            var directoryName = Path.GetFileName(expectedPath);
            if (directoryToSearch == null) {
                directoryToSearch = Application.dataPath;
            }
            var directories = Directory.GetDirectories(directoryToSearch, directoryName, SearchOption.AllDirectories);
            if (ignorePaths != null) {
                directories = directories.ToList().Where(d => !ignorePaths.Contains(d)).ToArray();
            }
            return _returnOnePathOrThrow(directories, expectedPath, directoryToSearch, true);
        }

        /// <summary>
        /// Returns the path to a given file, searching for it if needed.
        /// If `directoryToSearch` isn't provided, `Application.dataPath` is used.
        /// </summary>
        public static string FindFile(string expectedPath, string directoryToSearch = null) {

            if (File.Exists(expectedPath)) {
                return expectedPath;
            }
            // The file isn't in the expected location, so fall back to finding it.
            var fileName = Path.GetFileName(expectedPath);
            if (directoryToSearch == null) {
                directoryToSearch = Application.dataPath;
            }
            var files = Directory.GetFiles(directoryToSearch, fileName, SearchOption.AllDirectories);
            return _returnOnePathOrThrow(files, expectedPath, directoryToSearch);
        }

        public static void ForceAndroidInternetPermission() {

            #if !VUPLEX_ANDROID_DISABLE_REQUIRE_INTERNET
                if (!PlayerSettings.Android.forceInternetPermission) {
                    PlayerSettings.Android.forceInternetPermission = true;
                    WebViewLogger.LogWarning("Just a heads-up: 3D WebView changed the Android player setting \"Internet Access\" to \"Require\" to ensure that it can fetch web pages from the internet. (This message will only be logged once.)");
                }
            #endif
        }

        public static string GetLinkColor() {

            return EditorGUIUtility.isProSkin ? "#7faef0ff" : "#11468aff";
        }

        /// <summary>
        /// A polyfill for Path.Combine(string[]), which isn't present in legacy .NET 3.5.
        /// </summary>
        public static string PathCombine(string[] pathComponents) {

            if (pathComponents.Length == 0) {
                return "";
            }
            if (pathComponents.Length == 1) {
                return pathComponents[0];
            }
            var path = pathComponents[0];
            for (var i = 1; i < pathComponents.Length; i++) {
                path = System.IO.Path.Combine(path, pathComponents[i]);
            }
            return path;
        }

        public static string TextWithColor(string text, string color) {

            return String.Format("<color={0}>{1}</color>", color, text);
        }

        public static bool XRSdkIsEnabled(string sdkNameFragment) {

            // This approach is taken because the legacy Oculus XR plugin identifies itself as "Oculus", but
            // the new XR plugin shows up as two devices named "oculus input" and "oculus display". Similarly,
            // the MockHMD plugin used to identify itself as "MockHMD" but now it shows up as "MockHMD Head Tracking"
            // and "MockHMD Display".
            foreach (var sdkName in XRUtils.XRSettings.supportedDevices) {
                if (sdkName.ToLower().Contains(sdkNameFragment.ToLower())) {
                    return true;
                }
            }
            return false;
        }

        static string _returnOnePathOrThrow(string[] paths, string expectedPath, string directorySearched, bool isDirectory = false) {

            var itemName = isDirectory ? "directory" : "file";
            if (paths.Length == 1) {
                return paths[0];
            }
            var targetFileOrDirectoryName = Path.GetFileName(expectedPath);
            if (paths.Length > 1) {
                var joinedPaths = String.Join(", ", paths);
                throw new Exception(String.Format("Unable to determine which version of the {0} {1} to use because multiple instances ({2}) were unexpectedly found in the directory {3}. Please review the list of instances found and remove duplicates so that there is only one: {4}", itemName, targetFileOrDirectoryName, paths.Length, directorySearched, joinedPaths));
            }
            throw new Exception(String.Format("Unable to locate the {0} {1}. It's not in the expected location ({2}), and no instances were found in the directory {3}. To resolve this issue, please try deleting your existing Assets/Vuplex directory and reinstalling 3D WebView.", itemName, targetFileOrDirectoryName, expectedPath, directorySearched));
        }
    }
}
