import React, { useState, useEffect } from "react";
import { fetchUpcomingCompanies } from "../../../api/Student/Student.api"; // Adjust the path as needed
import CompanyCard from "../../../Components/CompanyCard/CompanyCard";
import companiesList from "../../../SampleData/CompanyList";
import UpcomingCompanies from "../UpcomingCompanies/UpcomingCompanies";

const StudentHome = () => {
  const [companies, setCompanies] = useState(companiesList);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const data = await fetchUpcomingCompanies();
        setCompanies(data);
      } catch (err) {
        setError("Failed to load upcoming companies.");
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  // if (loading) return <p className="text-gray-50">Loading...</p>;

  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="p-4 sm:ml-64 min-h-screen">
      <div className="mb-4 pb-10 min-h-screen px-8 mx-4 rounded">
        <h1 className="mb-4 text-4xl font-extrabold leading-none rounded-sm shadow-xl tracking-tight text-gray-50 md:text-5xl lg:text-6xl text-center bg-blue-600 p-5 ">
          Welcome To Placement Portal
        </h1>

        {/* Upcoming Companies */}
        <UpcomingCompanies/>
      </div>
      </div>
    </div>
  );
};

export default StudentHome;
