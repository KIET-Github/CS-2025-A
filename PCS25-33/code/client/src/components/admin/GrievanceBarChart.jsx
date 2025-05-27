"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";

export default function GrievanceBarChart({ grievances }) {
    // Compute last 7 days' labels
    const last7Days = eachDayOfInterval({
        start: subDays(new Date(), 6),
        end: new Date(),
    });

    // Count grievances per day
    const chartData = last7Days.map((date) => {
        const formatted = format(date, "MMM d");
        const count = grievances.filter(
            (g) =>
                format(new Date(g.submittedAt), "yyyy-MM-dd") ===
                format(date, "yyyy-MM-dd")
        ).length;
        return { date: formatted, count };
    });

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Grievances in Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3182ce" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
