package com.example.aicteapp

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AuthViewModel : ViewModel() {

    private val auth: FirebaseAuth = FirebaseAuth.getInstance()

    private val _authSuccess = MutableStateFlow(false)
    val authSuccess: StateFlow<Boolean> = _authSuccess

    private val _authError = MutableStateFlow<String?>(null)
    val authError: StateFlow<String?> = _authError

    fun registerWithEmailPassword(email: String, password: String) {
        viewModelScope.launch {
            auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        _authSuccess.value = true
                        _authError.value = null
                    } else {
                        _authSuccess.value = false
                        _authError.value = task.exception?.localizedMessage
                        Log.e("AuthViewModel", "Registration failed: ${task.exception?.message}")
                    }
                }
        }
    }

    fun loginWithEmailPassword(email: String, password: String) {
        viewModelScope.launch {
            auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        _authSuccess.value = true
                        _authError.value = null
                    } else {
                        _authSuccess.value = false
                        _authError.value = task.exception?.localizedMessage
                        Log.e("AuthViewModel", "Login failed: ${task.exception?.message}")
                    }
                }
        }
    }

    fun checkIfUserLoggedIn(): Boolean {
        return auth.currentUser != null
    }

    fun logout() {
        auth.signOut()
        _authSuccess.value = false
    }
}
