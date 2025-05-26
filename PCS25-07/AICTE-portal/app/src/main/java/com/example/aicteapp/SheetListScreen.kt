package com.example.aicteapp

import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.scrollable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import java.net.URLEncoder

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SheetListScreen(navController: NavController) {
    val sheetUrls = mapOf(
        "AICTE Approved Institutions" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=1880467659&single=true&output=csv",
        "New Institutions" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=2040079790&single=true&output=csv",
        "Statewise Approved Institutions" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=839122294&single=true&output=csv",
        "Approved Intake by Course level" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=34874585&single=true&output=csv",
        "Approved Intake by Institution type" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=1884842259&single=true&output=csv",
        "Approved Intake Programme wise" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=1328715610&single=true&output=csv",
        "Statewise Approved Intake" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=1419267869&single=true&output=csv",
        "Statewise Total Enrollment" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=984559484&single=true&output=csv",
        "Yearly Approved Intake & Enroll" to "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD2jBvgl6o9stWYtnNTcfY8NEBTFPcKn12OYf8Bav40eY3K_CCa0qYtOC1wFMPz8tAsnUkpCxBWc0_/pub?gid=2085189991&single=true&output=csv"
    )
    val scrollState = rememberScrollState()
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Select a Sheet") })
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .verticalScroll(scrollState)
                .padding(innerPadding)
                .padding(16.dp)
        ) {
            sheetUrls.forEach { (name, url) ->
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp)
                        .clickable {
                            val encodedUrl = URLEncoder.encode(url, "UTF-8")
                            navController.navigate("sheetDetail/$name/$encodedUrl")
                        }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(text = name, style = MaterialTheme.typography.titleMedium)
                        Text(text = "Tap to view data", style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
    }
}