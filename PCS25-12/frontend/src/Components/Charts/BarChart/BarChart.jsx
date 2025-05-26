// BarChartComponent.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for the chart
const data = [
  { name: "Jan", Placed: 40, amt: 2400 },
  { name: "Feb", Placed: 30, amt: 2210 },
  { name: "Mar", Placed: 5, amt: 2290 },
  { name: "Apr", Placed: 8, amt: 2000 },
  { name: "May", Placed: 30, amt: 2181 },
  { name: "Jun", Placed: 45, amt: 2500 },
  { name: "Jul", Placed: 130, amt: 2100 },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Placed" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
