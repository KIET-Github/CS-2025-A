import React, { useState, useEffect } from "react";
import { getDashboardDetails } from "../../../api/Company/Company.api";
import CompanyJobListings from "../CompanyJobListing/CompanyJobListing";

const CompanyDashboard = () => {
  const [dashboardData, setDashboardData] = useState({ studentsCount: 0, companiesCount: 0, batch: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardDetails();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // if (loading) return <p>Loading dashboard data...</p>;
  // if (error) return <p>Error loading dashboard data: {error.message}</p>;

  const { studentsCount, companiesCount, batch } = dashboardData;

  return (
    <div>
      <div className="p-4 sm:ml-64 text-white min-h-screen">
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="flex items-center h-10 intro-y">
                  <h2 className="mr-5 text-lg text-gray-50 font-medium truncate">
                    Dashboard
                  </h2>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">
                  <a
                    className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          className="h-8 w-8 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">Students</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-gray-600 text-3xl font-bold leading-8">
                            {studentsCount}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {batch}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>

                  <a
                    className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          />
                        </svg>
                        <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">
                            Applications
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-gray-600 text-3xl font-bold leading-8">
                            {companiesCount}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {batch}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
