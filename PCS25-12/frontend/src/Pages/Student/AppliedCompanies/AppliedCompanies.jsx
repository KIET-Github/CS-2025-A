import React, { useState, useEffect } from "react";
import { fetchAppliedCompanies } from "../../../api/Student/Student.api"; // Adjust the path as needed
import CompanyCard from "../../../Components/AppliedCompanyCard/AppliedCompanyCard";
import companiesList from "../../../SampleData/AppliedCompanyList";

const AppliedCompanies = () => {
  const [companies, setCompanies] = useState(companiesList);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAppliedCompanies = async () => {
      try {
        const data = await fetchAppliedCompanies();
        setCompanies(data);
      } catch (err) {
        setError("Failed to fetch applied companies.");
      } finally {
        setLoading(false);
      }
    };

    getAppliedCompanies();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="p-4 sm:ml-64 min-h-screen">
      <div className="mb-4 pb-10 min-h-screen px-8 mx-4 rounded">

        {/* Applied Companies */}
        <div className="flex items-center h-10 intro-y">
          <h2 className="mr-5 text-2xl font-bold text-gray-100 truncate">
            Applied Companies
          </h2>
        </div>
        <main className="py-6 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              id={company.id}
              name={company.name}
              packageOffer={company.package}
              registrationDate={company.registrationDate}
              imageUrl={company.image}
              status={company.status}
            />
          ))}
        </main>
      </div>
      </div>
    </div>
  );
};

export default AppliedCompanies;
