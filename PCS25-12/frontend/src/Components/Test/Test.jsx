import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-200">
            Welcome to Placement Portal
          </h1>
          <p className="text-center text-gray-400">Please select your role:</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/student" // Update this to the correct route for students
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Student
            </Link>
          </div>
          <p className="text-center text-gray-400">Login As Admin/Hod</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/admin" // Update this to the correct route for Admin login
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Admin/Hod
            </Link>
          </div>
          <p className="text-center text-gray-400">Login As Company</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/company" // Update this to the correct route for Admin login
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-6 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
