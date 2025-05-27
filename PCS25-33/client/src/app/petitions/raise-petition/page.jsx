"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/user/Navbar";

export default function RaisePetitionPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(
                "http://localhost:8000/api/v1/petitions/create",
                { title, description },
                { withCredentials: true }
            );
            router.push("/petitions");
        } catch (error) {
            console.error("Error creating petition:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
                <div className="max-w-lg w-full bg-white border border-gray-300 rounded-2xl shadow-lg p-10">
                    <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
                        Create a New Petition
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-semibold text-black mb-2"
                            >
                                Petition Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter the petition title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-400 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-semibold text-black mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Describe your petition in detail"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-400 rounded-lg shadow-sm resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 active:scale-95 transition-transform"
                        >
                            {loading ? "Submitting..." : "Submit Petition"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
