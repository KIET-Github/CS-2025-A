"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/user/Navbar";
import { UserContext } from "@/context/userContext.js"; // Adjust path as needed

export default function PetitionPage() {
    const { user } = useContext(UserContext);
    const [petitions, setPetitions] = useState([]);

    const fetchPetitions = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/petitions/archive", {
                withCredentials: true,
            });
            setPetitions(res.data.data || []);
        } catch (error) {
            console.error("Error fetching petitions:", error);
        }
    };

    useEffect(() => {
        fetchPetitions();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this petition?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:8000/api/v1/petitions/delete/${id}`, {
                withCredentials: true,
            });
            setPetitions((prev) => prev.filter((petition) => petition._id !== id));
        } catch (error) {
            console.error("Error deleting petition:", error);
        }
    };

    const handleUpvote = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/petitions/upvote/${id}`,
                {}, // assuming no body is needed
                { withCredentials: true }
            );

            // Update the upvote count locally
            setPetitions((prev) =>
                prev.map((petition) =>
                    petition._id === id
                        ? { ...petition, upvoteCount: res.data.upvoteCount ?? petition.upvoteCount + 1 }
                        : petition
                )
            );
        } catch (error) {
            console.error("Error upvoting petition:", error);
            alert("Failed to upvote petition. Please try again.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
                <h2 className="text-4xl font-bold text-blue-700 mb-8">All Petitions</h2>

                <div className="grid grid-cols-1 gap-6 max-w-4xl w-full">
                    {petitions.map((petition) => (
                        <div
                            key={petition._id}
                            className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.01]"
                        >
                            {/* Delete button */}
                            {user?.email === petition.email && (
                                <button
                                    onClick={() => handleDelete(petition._id)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-lg"
                                    title="Delete Petition"
                                >
                                    🗑️
                                </button>
                            )}
                            <div className="mb-1 text-sm text-gray-500">
                                {petition.name} • {petition.email}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{petition.title}</h3>
                            <p className="mt-2 text-gray-600">{petition.description}</p>
                            <div className="mt-4 flex items-center space-x-4">
                                <p className="text-blue-600 font-medium">
                                    Upvotes: {petition.upvoteCount ?? 0}
                                </p>
                                <button
                                    onClick={() => handleUpvote(petition._id)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                >
                                    Upvote
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/petitions/raise-petition"
                    className="mt-10 inline-block bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-transform hover:scale-105"
                >
                    Raise a Petition
                </Link>
            </div>
        </>
    );
}
