"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, List } from "lucide-react";

const GrievanceStats = () => {
    const [counts, setCounts] = useState({
        total: 0,
        pending: 0,
        solved: 0,
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/grievances/count", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setCounts(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching grievance counts:", error);
            }
        };

        fetchCounts();
    }, [counts]);

    const cards = [
        {
            title: "Total Grievances",
            count: counts.total,
            icon: <List className="w-8 h-8 text-white" />,
            bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
        },
        {
            title: "Pending",
            count: counts.pending,
            icon: <Clock className="w-8 h-8 text-white" />,
            bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
        },
        {
            title: "Resolved",
            count: counts.solved,
            icon: <CheckCircle className="w-8 h-8 text-white" />,
            bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 p-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`${card.bg} rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-white text-xl font-semibold">{card.title}</h2>
                            <p className="text-white text-5xl font-bold mt-2">{card.count}</p>
                        </div>
                        <div className="p-3 bg-white/20 rounded-full">{card.icon}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GrievanceStats;