"use client";

import Link from "next/link";
import { UserContext } from '@/context/userContext';
import { useState, useEffect, useRef, useContext } from "react";
import { Menu, X, User } from "lucide-react";
import LogoutButton from "@/components/Auth/Logout.jsx";
const Navbar = () => {
    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className=" pt-8  flex items-center justify-center">
            <div className="w-[90%] px-4 lg:px-16 py-4 lg:py-6 rounded-[30px] lg:rounded-full text-white bg-[#2323224d] backdrop-blur-[20px]">
                <div className="flex justify-between items-center relative">
                    <span className="font-semibold text-xl lg:text-3xl">
                        Grievance Portal
                    </span>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex gap-12">
                        <Link href={`/user/${user?.username}`} className="text-lg font-medium">My Grievances</Link>
                        <Link href="/petitions" className="text-lg font-medium">Petitions</Link>
                        <Link href="/user/my-grievance" className="text-lg font-medium">Submit Grievance</Link>
                    </nav>

                    {/* User Dropdown */}
                    <div className="hidden lg:flex relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
                            <User size={32} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
                                <Link href={`/user/${user.username}`} className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
                            </div>
                        )}
                        <div className="ml-4">
                            <LogoutButton />
                        </div>
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {isOpen && (
                    <nav className="lg:hidden flex flex-col gap-4 mt-4 border-t pt-4">
                        <Link href="/user" className="text-lg font-medium">My Grievances</Link>
                        <Link href="/petitions" className="text-lg font-medium">Petitions</Link>
                        <Link href="/user/my-grievance" className="text-lg font-medium">Submit Grievance</Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
