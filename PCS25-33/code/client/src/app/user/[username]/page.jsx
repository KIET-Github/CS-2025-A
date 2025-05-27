"use client";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/context/userContext';
import Link from 'next/link';
import axios from 'axios';
import EachGrievanceCard from './EachGrievanceCard';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/grievances/currentuser', {
                    withCredentials: true,
                });
                setGrievances(res.data.data);
            } catch (error) {
                console.error("Error fetching grievances:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchGrievances();
    }, [user]);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this grievance?");
            if (!confirmDelete) return;

            await axios.delete(`http://localhost:8000/api/v1/grievances/delete/${id}`, {
                withCredentials: true,
            });

            setGrievances((prev) => prev.filter((g) => g._id !== id));
        } catch (error) {
            console.error("Error deleting grievance:", error);
            alert("Failed to delete grievance. Please try again.");
        }
    };

    const pendingGrievances = grievances.filter((g) => !g.status);
    const allGrievances = [...grievances].reverse();

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            {user ? (
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Hello, {user.fullName} 👋</h1>
                            <p className="text-gray-600 mt-1">Email: {user.email || "Not provided"}</p>
                            <p className="text-gray-600">Role: {user.role || "User"}</p>
                        </div>
                        <Link href="/user/my-grievance/">
                            <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition">
                                + New Grievance
                            </button>
                        </Link>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'pending'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setActiveTab('archive')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'archive'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            Archive
                        </button>
                    </div>

                    {/* Grievances Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            {activeTab === 'pending' ? 'Pending Grievances' : 'Archived Grievances'}
                        </h2>

                        {loading ? (
                            <p className="text-gray-500">Loading grievances...</p>
                        ) : activeTab === 'pending' ? (
                            pendingGrievances.length > 0 ? (
                                <div className="grid gap-6">
                                    {pendingGrievances.map((grievance) => (
                                        <EachGrievanceCard
                                            key={grievance._id}
                                            grievance={grievance}
                                            handleDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-10">No pending grievances found.</p>
                            )
                        ) : allGrievances.length > 0 ? (
                            <div className="grid gap-6">
                                {allGrievances.map((grievance) => (
                                    <EachGrievanceCard
                                        key={grievance._id}
                                        grievance={grievance}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                <p className="text-lg">You haven't submitted any grievances yet.</p>
                                <p className="text-sm mt-2">Click the "New Grievance" button to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl text-gray-600 mt-20">Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
