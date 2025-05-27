'use client'
import { useRouter } from 'next/navigation'
import axios from 'axios';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/v1/users/logout", {}, { withCredentials: true });
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    )
}

export default LogoutButton;
