"use client";
import { useState } from "react";
import GrievanceList from "@/components/admin/GrievanceList";
import PetitionList from "@/components/admin/PetitionList";
import LogoutButton from "@/components/Auth/Logout";
import GrievanceStats from "@/components/admin/GrievanceStats";
import GrievanceBarChart from "@/components/admin/GrievanceBarChart";

export default function AdminDashboard() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [grievancesData, setGrievancesData] = useState([]);
    const [activeTab, setActiveTab] = useState("stats");

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">Admin Dashboard</h2>
                <div className="flex justify-end mb-4">
                    <LogoutButton />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "stats"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 text-gray-800"
                        }`}
                    onClick={() => setActiveTab("stats")}
                >
                    Grievance Count
                </button>
                <button
                    className={`px-4 py-2 rounded-md font-medium ${activeTab === "chart"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 text-gray-800"
                        }`}
                    onClick={() => setActiveTab("chart")}
                >
                    Past 7 days
                </button>
            </div>

            {/* Toggle between GrievanceStats and GrievanceBarChart */}
            {activeTab === "stats" ? (
                <GrievanceStats />
            ) : (
                <GrievanceBarChart grievances={grievancesData} />
            )}

            <GrievanceList openModal={openModal} setGrievancesData={setGrievancesData} />
            <PetitionList openModal={openModal} />

            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl mb-4">
                            {selectedItem.title || selectedItem.grievance || "No Title"}
                        </h3>

                        <p className="text-gray-700"><strong>Name:</strong> {selectedItem.name || "Unknown"}</p>

                        {"description" in selectedItem && (
                            <p className="text-gray-700 mt-2">
                                <strong>Description:</strong> {selectedItem.description}
                            </p>
                        )}

                        <p className="text-gray-700 mt-2"><strong>Email:</strong> {selectedItem.email || "N/A"}</p>

                        {selectedItem.status && selectedItem.feedback && (
                            <p className="text-gray-700 mt-2">
                                <strong>Feedback:</strong> {selectedItem.feedback}
                            </p>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
