import { useState, useEffect } from "react";
import { fetchJobListings } from "../../../api/Company/Company.api"; // Adjust the path as needed
import sampleJobListings from "../../../SampleData/SampleJobListing";

export default function CompanyJobListings() {
  const [jobs, setJobs] = useState(sampleJobListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredJobId, setHoveredJobId] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobListings();
        setJobs(data);
      } catch (err) {
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id) => {
    console.log(`View job ${id}`);
    // Implement view logic
  };

  const handleDelete = async (id) => {
    console.log(`Delete job ${id}`);
    // Implement delete logic
  };

  const handleMouseEnter = (id) => {
    setHoveredJobId(id);
  };

  const handleMouseLeave = () => {
    setHoveredJobId(null);
  };

  return (
    <div className="p-4 sm:ml-64 text-white min-h-screen">
      <div className="grid mb-4 pb-10 px-8 mx-4 rounded">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-semibold text-blue-100 mb-6">
            Listed Job Roles
          </h2>

          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border rounded-md text-blue-800 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
          </div>

          {/* Table for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                      {job.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                      {job.postedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                      {hoveredJobId === job.id && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded-md shadow-lg">
                          {job.applicants} applicants
                        </div>
                      )}
                      <button
                        onMouseEnter={() => handleMouseEnter(job.id)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleView(job.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <svg
                          className="h-5 w-5 text-indigo-900"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile screens */}
          <div className="md:hidden space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-blue-900">
                    {job.role}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-blue-500">
                    {job.department}
                  </p>
                </div>
                <div className="border-t border-blue-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-blue-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-blue-500">
                        Posted Date
                      </dt>
                      <dd className="mt-1 text-sm text-blue-900 sm:mt-0 sm:col-span-2">
                        {job.postedDate}
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-blue-500">Status</dt>
                      <dd className="mt-1 text-sm text-blue-900 sm:mt-0 sm:col-span-2">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === "Open"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-blue-500">Actions</dt>
                      <dd className="mt-1 text-sm text-blue-900 sm:mt-0 sm:col-span-2 flex">
                        <button
                          onClick={() => handleView(job.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>

          {loading && <p className="mt-4 text-blue-500">Loading...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
