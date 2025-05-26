package com.example.aicteapp

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp


@Composable
fun AboutUsScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        Text(
            text = "About AICTE",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        SectionTitle("Historical Background")
        SectionText(
            "The beginning of formal technical education in India can be dated back to the mid-19th century. " +
                    "Major policy initiatives in the pre-independence period included the appointment of the Indian Universities Commission in 1902, " +
                    "issue of the Indian Education Policy Resolution in 1904, and the Governor General’s policy statement of 1913 stressing the importance of technical education. " +
                    "The establishment of IISc in Bangalore, Institute for Sugar, Textile & Leather Technology in Kanpur, N.C.E. in Bengal in 1905, and industrial schools in several provinces played a pivotal role."
        )

        Spacer(Modifier.height(16.dp))

        SectionTitle("Initial Set-up")
        SectionText(
            "All India Council for Technical Education (AICTE) was set up in November 1945 as a national-level apex advisory body to conduct a survey on the facilities available for technical education " +
                    "and to promote development in the country in a coordinated and integrated manner. As stipulated in the National Policy of Education (1986), AICTE was vested with:"
        )

        BulletList(
            listOf(
                "Statutory authority for planning, formulation, and maintenance of norms & standards",
                "Quality assurance through accreditation",
                "Funding in priority areas, monitoring, and evaluation",
                "Maintaining parity of certification & awards",
                "The management of technical education in the country"
            )
        )

        Spacer(Modifier.height(16.dp))

        SectionTitle("Important Milestones")
        TimelineEntry("1943", "Constitution of the Technical Education Committee of the Central Advisory Board of Education (CABE)")
        TimelineEntry("1944", "Preparation of the Sergeant Report")
        TimelineEntry("1945", "Formation of the All India Council for Technical Education (AICTE)")

        Spacer(Modifier.height(16.dp))

        SectionTitle("Role of National Working Group")
        SectionText(
            "The Ministry of Human Resource Development constituted a National Working Group to assess the role of AICTE in managing the growth of technical institutions and maintaining standards. " +
                    "The Group recommended giving AICTE statutory authority and strengthening its operational structure."
        )

        Spacer(Modifier.height(16.dp))

        SectionTitle("The AICTE Act 1987")
        SectionText(
            "The AICTE Act (No. 52 of 1987) was enacted to establish AICTE as a statutory body to oversee the planned development of technical education in India. " +
                    "Its goals include maintaining standards, regulating growth, and promoting quality improvement throughout the system."
        )

        Spacer(Modifier.height(16.dp))

        SectionTitle("Scope")
        SectionText(
            "The purview of AICTE covers technical education including training and research in areas such as:\n" +
                    "- Engineering\n" +
                    "- Technology\n" +
                    "- Architecture\n" +
                    "- Town Planning\n" +
                    "- Management\n" +
                    "- Pharmacy\n" +
                    "- Applied Arts and Crafts\n" +
                    "- Hotel Management and Catering Technology"
        )
    }
}


@Composable
fun SectionTitle(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.titleLarge,
        modifier = Modifier.padding(vertical = 8.dp)
    )
}

@Composable
fun SectionText(content: String) {
    Text(
        text = content,
        style = MaterialTheme.typography.bodyMedium,
        lineHeight = 20.sp
    )
}

@Composable
fun BulletList(items: List<String>) {
    Column {
        items.forEach { item ->
            Row(verticalAlignment = Alignment.Top) {
                Text("• ", style = MaterialTheme.typography.bodyMedium)
                Text(
                    text = item,
                    style = MaterialTheme.typography.bodyMedium,
                    lineHeight = 20.sp
                )
            }
        }
    }
}

@Composable
fun TimelineEntry(year: String, description: String) {
    Row(modifier = Modifier.padding(vertical = 4.dp)) {
        Text(
            text = "$year:",
            style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier.width(60.dp)
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodyMedium,
            lineHeight = 20.sp
        )
    }
}
