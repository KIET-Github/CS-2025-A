import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class LineTitles {
  static getTitleData() {
    final style = TextStyle(
      color: Colors.white70,
      fontWeight: FontWeight.bold,
      fontSize: 16,
    );

    return FlTitlesData(
      show: false,
    );
  }
}
