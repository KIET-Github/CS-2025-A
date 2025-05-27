"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GrievanceList({ openModal, setGrievancesData }) {
    const [grievances, setGrievances] = useState([]);
    const [activeTab, setActiveTab] = useState("pending");

    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
    const [feedbackText, setFeedbackText] = useState("");

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/grievances/archive", {
                    withCredentials: true,
                });
                setGrievances(res.data.data);
                setGrievancesData(res.data.data); // pass to parent
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };
        fetchGrievances();
    }, []);

    const openFeedbackModal = (id) => {
        setSelectedGrievanceId(id);
        setShowFeedbackModal(true);
    };

    const submitFeedbackAndResolve = async () => {
        try {
            const res = await axios.put(
                `http://localhost:8000/api/v1/grievances/${selectedGrievanceId}/mark-as-resolved`,
                { feedback: feedbackText },
                { withCredentials: true }
            );

            if (res.data.success) {
                setGrievances((prev) =>
                    prev.map((g) =>
                        g._id === selectedGrievanceId
                            ? { ...g, status: true, feedback: feedbackText }
                            : g
                    )
                );
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setShowFeedbackModal(false);
            setFeedbackText("");
            setSelectedGrievanceId(null);
        }
    };

    const filteredGrievances = grievances
        .filter((g) => (activeTab === "pending" ? !g.status : g.status))
        .slice()
        .reverse();

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Grievance List</h3>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "pending"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setActiveTab("resolved")}
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "resolved"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Resolved
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                    <thead>
                        <tr className="bg-blue-100 text-blue-900">
                            <th className="p-3 border">Author</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">View</th>
                            <th className="p-3 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGrievances.map((grievance) => (
                            <tr key={grievance._id} className="border-b">
                                <td className="p-3 border">{grievance.name}</td>
                                <td className="p-3 border">
                                    {new Date(grievance.submittedAt).toLocaleDateString()}
                                </td>
                                <td
                                    className="p-3 border text-blue-500 cursor-pointer underline"
                                    onClick={() => openModal(grievance)}
                                >
                                    View
                                </td>
                                <td className="p-3 border">
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={
                                                grievance.status
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }
                                        >
                                            {grievance.status ? "Resolved" : "Pending"}
                                        </span>
                                        {!grievance.status && activeTab === "pending" && (
                                            <button
                                                className="ml-4 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                onClick={() => openFeedbackModal(grievance._id)}
                                            >
                                                Solve Issue
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredGrievances.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center p-4 text-gray-500">
                                    No grievances in this tab.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showFeedbackModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">Provide Feedback</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 mb-4"
                            rows={4}
                            placeholder="Enter your feedback..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => {
                                    setShowFeedbackModal(false);
                                    setFeedbackText("");
                                    setSelectedGrievanceId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                onClick={submitFeedbackAndResolve}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
