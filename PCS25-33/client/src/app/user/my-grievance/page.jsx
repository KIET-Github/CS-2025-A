"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const GrievanceForm = () => {
    const [grievance, setGrievance] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!grievance.trim()) {
            alert("Please enter your grievance.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/grievances/create",
                { grievance },
                { withCredentials: true }
            );

            console.log(response);

            // alert("Grievance submitted successfully!");
            setGrievance("");
            router.push("/user");
        } catch (error) {
            console.error("Grievance submission failed:", error);
            // alert("Failed to submit grievance. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center px-4 py-16">
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-blue-100">
                <Link href="/user">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                        title="Cancel"
                    >
                        <X size={24} />
                    </button>
                </Link>

                <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center tracking-tight">
                    Submit Your Grievance
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="grievance"
                            className="block text-gray-800 text-lg font-medium mb-2"
                        >
                            Describe the Issue
                        </label>
                        <textarea
                            id="grievance"
                            rows={6}
                            value={grievance}
                            onChange={(e) => setGrievance(e.target.value)}
                            placeholder="Clearly explain the grievance you’re facing..."
                            className="w-full rounded-xl border border-gray-300 p-4 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none shadow-sm transition"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow-md transition duration-200 ease-in-out"
                        >
                            Submit Grievance
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GrievanceForm;
