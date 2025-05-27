"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PetitionList({ openModal }) {
    const [petitions, setPetitions] = useState([]);

    useEffect(() => {
        const fetchPetitions = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/petitions/archive", {
                    withCredentials: true,
                });

                const sortedPetitions = res.data.data.sort(
                    (a, b) => b.upvoteCount - a.upvoteCount
                );

                setPetitions(sortedPetitions);
            } catch (error) {
                console.error("Error fetching petitions:", error);
            }
        };

        fetchPetitions();
    }, []);


    return (
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Petition List</h3>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-[#DBEAFE] text-green-900">
                        <th className="p-3 border">Author</th>
                        <th className="p-3 border">Date</th>
                        <th className="p-3 border">Title</th>
                        <th className="p-3 border">Description</th>
                        <th className="p-3 border">Upvotes</th>
                        <th className="p-3 border">View</th>
                    </tr>
                </thead>
                <tbody>
                    {petitions.map((petition) => (
                        <tr key={petition._id || petition.id} className="border-b">
                            <td className="p-3 border">{petition.name}</td>
                            <td className="p-3 border">
                                {new Date(petition.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 border">{petition.title}</td>
                            <td className="p-3 border">
                                {petition.description.length > 30
                                    ? petition.description.slice(0, 30) + "..."
                                    : petition.description}
                            </td>
                            <td className="p-3 border">{petition.upvoteCount}</td>
                            <td
                                className="p-3 border text-blue-500 cursor-pointer underline"
                                onClick={() => openModal(petition)}
                            >
                                View
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
