import { useState } from "react";
import { addJobRole } from "../../../api/Company/Company.api"; // Adjust the import path as needed

export default function AddJobRole() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    jobDescription: "",
    jobRequirements: "",
    registrationDate: "",
    companyImage: null,
    minimumGPA: "",
    maximumBacklogs: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    website: "",
    phoneNumber: "",
    eligibleBatch: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      companyImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await addJobRole(formDataToSend);
      // Reset form or show success message
      setFormData({
        companyName: "",
        jobRole: "",
        jobDescription: "",
        jobRequirements: "",
        registrationDate: "",
        companyImage: null,
        minimumGPA: "",
        maximumBacklogs: "",
        tenthPercentage: "",
        twelfthPercentage: "",
        website: "",
        phoneNumber: "",
        eligibleBatch: "",
      });
      alert("Job role added successfully");
    } catch (error) {
      console.error("Error adding job role:", error);
      alert("Failed to add job role");
    }
  };
  return (
    <div className="p-4 sm:ml-64 text-black min-h-screen">
      <div className="grid mb-4 pb-10 px-8 mx-4 rounded 0">
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Add New Job Role
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="jobRole"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Role
                </label>
                <input
                  type="text"
                  id="jobRole"
                  name="jobRole"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="jobRequirements"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Requirements
                </label>
                <textarea
                  id="jobRequirements"
                  name="jobRequirements"
                  rows="4"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="registrationDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Date
                </label>
                <input
                  type="date"
                  id="registrationDate"
                  name="registrationDate"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="companyImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Image
                </label>
                <input
                  type="file"
                  id="companyImage"
                  name="companyImage"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label
                  htmlFor="minimumGPA"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum CGPA
                </label>
                <input
                  type="number"
                  id="minimumGPA"
                  name="minimumGPA"
                  step="0.01"
                  min="0"
                  max="10"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="maximumBacklogs"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Backlogs
                </label>
                <input
                  type="number"
                  id="maximumBacklogs"
                  name="maximumBacklogs"
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="tenthPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  10th Percentage
                </label>
                <input
                  type="number"
                  id="tenthPercentage"
                  name="tenthPercentage"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="twelfthPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  12th Percentage
                </label>
                <input
                  type="number"
                  id="twelfthPercentage"
                  name="twelfthPercentage"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="eligibleBatch"
                  className="block text-sm font-medium text-gray-700"
                >
                  Eligible Batch
                </label>
                <input
                  type="text"
                  id="eligibleBatch"
                  name="eligibleBatch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Job Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
