import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const StudentList = ({ batch, data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleViewDetails = (rollNo) => {
    navigate(`${location.pathname}/${rollNo}`);
  };

  return (
    <div>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h1 className="font-bold text-gray-900 text-base">Batch {batch}</h1>
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-blue-200 sm:rounded-lg bg-white">
                  <table className="min-w-full divide-y divide-blue-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Roll No.</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Student Name</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Branch</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Email</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Status</span>
                          </div>
                        </th>
                        <th className="px-6 py-3 bg-blue-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex cursor-pointer">
                            <span className="mr-2">Details</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue-200">
                      {data && data.length > 0 ? (
                        data.map((student, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              <p>{student.s_id}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              <p>{student.student_name}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              <p>{student.branch}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              <p>{student.email}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              <div
                                className={`flex ${
                                  student.status === "Placed"
                                    ? "text-green-500"
                                    : student.status === "Not Placed"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {student.status === "Placed" ? (
                                  <div>
                                    <svg
                                      className="h-6 w-6 text-green-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="9 11 12 14 22 4" />
                                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                  </div>
                                ) : student.status === "Not Placed" ? (
                                  <div>
                                    <svg
                                      className="h-6 w-6 text-red-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                      />
                                      <line x1="3" y1="21" x2="21" y2="3" />
                                    </svg>
                                  </div>
                                ) : (
                                  <div>
                                    <svg
                                      className="h-6 w-6 text-yellow-500"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <path d="M12 6v6l4 2" />
                                    </svg>
                                  </div>
                                )}
                                <p className="pl-2">{student.status}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                              <button
                                onClick={() =>
                                  handleViewDetails(student.rollNo)
                                }
                                className="text-gray-200 p-2 rounded-sm bg-blue-600  hover:text-gray-900 hover:bg-blue-200"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center"
                          >
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
