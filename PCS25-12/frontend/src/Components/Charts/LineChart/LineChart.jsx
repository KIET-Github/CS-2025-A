// SimpleLineChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", "2025 placed CS students": 40, "2024 placed CS students": 20, amt: 2400 },
  { name: "Feb", "2025 placed CS students": 30, "2024 placed CS students": 13, amt: 2210 },
  { name: "Mar", "2025 placed CS students": 5, "2024 placed CS students": 98, amt: 2290 },
  { name: "Apr", "2025 placed CS students": 8, "2024 placed CS students": 39, amt: 2000 },
  { name: "May", "2025 placed CS students": 30, "2024 placed CS students": 4, amt: 2181 },
  { name: "Jun", "2025 placed CS students": 45, "2024 placed CS students": 38, amt: 2500 },
  { name: "Jul", "2025 placed CS students": 130, "2024 placed CS students": 4, amt: 2100 },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="2025 placed CS students" stroke="#8884d8" />
        <Line type="monotone" dataKey="2024 placed CS students" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
