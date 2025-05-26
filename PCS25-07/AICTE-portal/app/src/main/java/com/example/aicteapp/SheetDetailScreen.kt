package com.example.aicteapp

import android.graphics.Color as AndroidColor
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.data.BarEntry as MPBarEntry
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import androidx.compose.ui.viewinterop.AndroidView

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SheetDetailScreen(sheetName: String, sheetUrl: String, navController: NavController) {
    var sheetData by rememberSaveable { mutableStateOf<List<List<String>>>(emptyList()) }
    var isGraphView by rememberSaveable { mutableStateOf(true) }
    var isLoading by rememberSaveable { mutableStateOf(true) }
    var errorMsg by rememberSaveable { mutableStateOf<String?>(null) }

    LaunchedEffect(sheetUrl) {
        isLoading = true
        errorMsg = null
        try {
            sheetData = fetchCsvFromGoogleSheet(sheetUrl)
        } catch (e: Exception) {
            errorMsg = "Failed to load data: ${e.localizedMessage}"
        }
        isLoading = false
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = sheetName, color = Color.White) },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                },
                actions = {
                    Row(
                        modifier = Modifier.padding(horizontal = 16.dp),
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                    ) {
                        Text("Graph", color = Color.White)
                        Spacer(modifier = Modifier.width(8.dp))
                        Switch(checked = isGraphView, onCheckedChange = { isGraphView = it })
                    }
                }
            )
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .background(Color.Black)
                .padding(innerPadding)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            when {
                isLoading -> {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = androidx.compose.ui.Alignment.Center
                    ) {
                        CircularProgressIndicator()
                    }
                }

                errorMsg != null -> {
                    Text(text = errorMsg!!, color = Color.White)
                }

                sheetData.isEmpty() -> {
                    Text("No data found.", color = Color.White)
                }

                else -> {
                    if (isGraphView) {
                        val entries = convertToBarEntries(sheetData)
                        if (entries.entries.isNotEmpty()) {
                            BarChartView(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(350.dp),
                                entries = entries.entries,
                                labels = entries.labels,
                                label = sheetName
                            )
                        } else {
                            Text("Not enough data for chart", color = Color.White)
                        }
                    } else {
                        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            item {
                                if (sheetData.isNotEmpty()) {
                                    Row(
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .horizontalScroll(rememberScrollState()),
                                        horizontalArrangement = Arrangement.Start
                                    ) {
                                        sheetData.first().forEach { header ->
                                            Text(
                                                text = header,
                                                style = MaterialTheme.typography.titleMedium,
                                                color = Color.White,
                                                modifier = Modifier
                                                    .padding(8.dp)
                                                    .widthIn(min = 100.dp)
                                            )
                                        }
                                    }
                                    Divider(color = Color.Gray)
                                }
                            }
                            items(sheetData.drop(1)) { row ->
                                Card(
                                    shape = RoundedCornerShape(8.dp),
                                    colors = CardDefaults.cardColors(containerColor = Color.DarkGray),
                                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Row(
                                        modifier = Modifier
                                            .padding(8.dp)
                                            .horizontalScroll(rememberScrollState()),
                                        horizontalArrangement = Arrangement.Start
                                    ) {
                                        row.forEach { cell ->
                                            Text(
                                                text = cell,
                                                style = MaterialTheme.typography.bodySmall,
                                                color = Color.White,
                                                modifier = Modifier.widthIn(min = 100.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
@Composable
fun BarChartView(
    modifier: Modifier = Modifier,
    entries: List<BarEntry>,
    labels: List<String>,
    label: String
) {
    AndroidView(
        factory = { context ->
            BarChart(context).apply {
                setBackgroundColor(AndroidColor.BLACK) // Background of the chart

                // Chart description and settings
                description.isEnabled = false
                setFitBars(true)
                setNoDataText("No chart data available")
                setNoDataTextColor(AndroidColor.WHITE)

                axisRight.isEnabled = false
                legend.textColor = AndroidColor.WHITE // Legend text

                // Axis text and settings
                xAxis.apply {
                    position = XAxis.XAxisPosition.BOTTOM
                    valueFormatter = IndexAxisValueFormatter(labels)
                    setDrawGridLines(false)
                    granularity = 1f
                    labelRotationAngle = -45f
                    textColor = AndroidColor.WHITE // X-axis labels
                }

                axisLeft.textColor = AndroidColor.WHITE // Y-axis labels
                axisLeft.gridColor = AndroidColor.GRAY
                axisLeft.axisLineColor = AndroidColor.WHITE

                axisRight.textColor = AndroidColor.WHITE

                val dataSet = BarDataSet(entries, label).apply {
                    color = AndroidColor.parseColor("#3F51B5")
                    valueTextColor = AndroidColor.WHITE // Text on top of bars
                    valueTextSize = 12f
                }

                val barData = BarData(dataSet).apply {
                    barWidth = 0.9f
                }

                data = barData
                invalidate()
            }
        },
        modifier = modifier
    )
}

data class ChartEntries(
    val entries: List<MPBarEntry>,
    val labels: List<String>
)

fun convertToBarEntries(data: List<List<String>>): ChartEntries {
    if (data.size < 2) return ChartEntries(emptyList(), emptyList())
    val labels = mutableListOf<String>()
    val entries = mutableListOf<MPBarEntry>()

    data.drop(1).forEachIndexed { index, row ->
        val label = row.getOrNull(0) ?: return@forEachIndexed
        val value = row.getOrNull(1)?.toFloatOrNull() ?: return@forEachIndexed
        labels.add(label)
        entries.add(MPBarEntry(index.toFloat(), value))
    }

    return ChartEntries(entries, labels)
}

suspend fun fetchCsvFromGoogleSheet(sheetUrl: String): List<List<String>> {
    return withContext(Dispatchers.IO) {
        val client = OkHttpClient()
        val request = Request.Builder().url(sheetUrl).build()
        val response = client.newCall(request).execute()

        response.body?.string()?.let { csv ->
            csv.lines()
                .filter { it.isNotBlank() }
                .map { it.split(",") }
        } ?: emptyList()
    }
}
