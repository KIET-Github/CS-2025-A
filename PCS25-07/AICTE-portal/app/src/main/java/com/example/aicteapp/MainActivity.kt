// MainActivity.kt
package com.example.aicteapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.navigation.compose.rememberNavController
import com.example.aicteapp.ui.theme.AICTEAppTheme

class MainActivity : ComponentActivity() {
    private val authViewModel: AuthViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AICTEAppTheme {
                val navController = rememberNavController()
                val isUserAuthenticated = authViewModel.checkIfUserLoggedIn()
                val viewModel=AuthViewModel()
                AppScaffold(
                    navController = navController,
                    viewModel = viewModel,
                    isUserAuthenticated = isUserAuthenticated
                )
            }
        }
    }
}
