import React, { useEffect, useState } from "react";
import LineChart from "../../../Components/Charts/LineChart/LineChart";
import BarChart from "../../../Components/Charts/BarChart/BarChart";
import { getHodData } from "../../../api/Admin/Admin.api";

// Sample Data (For reference)
// const Data = {
//   Batch: 2025,
//   Students: 4500,
//   Selected_Students: 1451,
//   Companies: 50,
//   Applications: 4000,

// };

const AdminHome = () => {
  const [data, setData] = useState({
  Batch: 2025,
  Students: 300,
  Selected_Students: 288,
  Companies: 50,
  Applications: 4000,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHodData = async () => {
      try {
        const response = await getHodData();
        setData(response); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHodData();
  }, []);


  // uncomment after setting API
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="p-4 sm:ml-64 text-white min-h-screen">
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="flex items-center h-10 intro-y">
                  <h2 className="mr-5 text-lg text-gray-100 font-medium truncate">
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
                            {data.Students}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {data.Batch}
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
                          className="h-8 w-8 text-red-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                          <polyline points="13 2 13 9 20 9" />
                        </svg>
                        <div className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">Applications</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-gray-600 text-3xl font-bold leading-8">
                            {data.Applications}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {data.Batch}
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
                          <span className="flex items-center">Companies</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-gray-600 text-3xl font-bold leading-8">
                            {data.Companies}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {data.Batch}
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
                          className="h-7 w-7 text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                          />
                        </svg>
                        <div className="bg-purple-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">
                            Selected Students
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-gray-600 text-3xl font-bold leading-8">
                            {data.Selected_Students}
                          </div>
                          <div className="mt-1 text-base text-gray-600">
                            Batch {data.Batch}
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-span-12 mt-5">
                <div className="">
                  <div className="bg-white shadow-lg p-4" id="chartline">
                    <LineChart />
                  </div>
                  <div className="bg-white mt-8 shadow-lg p-4" id="chartline">
                    <BarChart />
                  </div>
                </div>
              </div>
              <div className="col-span-12 mt-5">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
