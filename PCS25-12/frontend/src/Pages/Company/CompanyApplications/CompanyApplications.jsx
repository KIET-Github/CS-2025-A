import React, { useState, useEffect } from "react";
import { getApplications } from "../../../api/Company/Company.api";

const CompanyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error loading applications: {error.message}</p>;

  return (
    <div className="p-4 sm:ml-64 text-white min-h-screen">
      <div className="grid mb-4 pb-10 px-8 mx-4 rounded">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">
          Applications
        </h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((application) => (
              <li key={application.id} className="bg-gray-800 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">{application.jobRole}</h3>
                <p className="text-gray-300">{application.companyName}</p>
                <p className="text-gray-400">{application.dateApplied}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompanyApplications;
