import React, { useEffect, useState } from "react";
import CompanyCard from "../../../Components/CompanyCard/CompanyCard";
import { fetchCompaniesFromAPI } from "../../../api/Admin/Admin.api"; 
import companiesList from "../../../SampleData/CompanyList";

const UpcomingCompanies = () => {
  const [companies, setCompanies] = useState(companiesList);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const data = await fetchCompaniesFromAPI(token);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching company data:", error.message);
      }
    };

    fetchCompanies();
  }, []);

  return (
<>
        <div className="flex items-center h-10 intro-y">
          <h2 className="mr-5 text-2xl font-bold text-gray-100 truncate">
            Upcoming Companies
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
            />
          ))}
        </main>
        </>
  );
};

export default UpcomingCompanies;
