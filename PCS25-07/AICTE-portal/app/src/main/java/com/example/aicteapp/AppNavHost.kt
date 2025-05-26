package com.example.aicteapp

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

@Composable
fun AppNavHost(
    navController: NavHostController,
    viewModel: AuthViewModel,
    isUserAuthenticated: Boolean
) {
    NavHost(
        navController = navController,
        startDestination = if (isUserAuthenticated) "sheetList" else "emailAuth"
    ) {

        composable("emailAuth") {
            EmailAuthScreen(viewModel = viewModel, onAuthSuccess = {
                navController.navigate("sheetList") {
                    popUpTo("emailAuth") { inclusive = true }
                }
            })
        }

        composable("sheetList") {
            SheetListScreen(navController = navController)
        }

        composable(
            "sheetDetail/{name}/{encodedUrl}",
            arguments = listOf(
                navArgument("name") { type = NavType.StringType },
                navArgument("encodedUrl") { type = NavType.StringType }
            )
        ) { backStackEntry ->
            val name = backStackEntry.arguments?.getString("name") ?: ""
            val encodedUrl = backStackEntry.arguments?.getString("encodedUrl") ?: ""
            val url = try {
                java.net.URLDecoder.decode(encodedUrl, "UTF-8")
            } catch (e: Exception) {
                ""
            }

            SheetDetailScreen(sheetName = name, sheetUrl = url, navController = navController)
        }

        composable("pdfViewer") {
            PDFViewerScreen()
        }

        composable("about") {
            AboutUsScreen()
        }

    }
}
