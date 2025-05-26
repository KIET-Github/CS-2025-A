import React from "react";
import { useParams } from "react-router-dom";
import SampleData from "../../SampleData/StudentList"; // Adjust the import path as needed

export default function StudentDetails() {
  const { rollNo } = useParams(); // Get roll number from URL
  const student = SampleData.find((student) => student.rollNo === rollNo); // Find student by roll number

  if (!student) {
    return (
      <div className="p-4 sm:ml-64 min-h-screen">
        <div className="mb-4 pb-10 flex items-center min-h-screen  px-8 mx-4 rounded ">
          <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Not Found
              </h2>
              <p className="text-gray-600">
                No student found with roll number {rollNo}.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64 min-h-screen">
      <div className="mb-4 pb-10 flex items-center min-h-screen  px-8 mx-4 rounded ">
        <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {student.name}
                </h2>
                <p className="text-gray-600">{student.university}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-700">Roll No.</h3>
                <p className="text-gray-600">{student.rollNo}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Branch</h3>
                <p className="text-gray-600">{student.branch}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Section</h3>
                <p className="text-gray-600">{student.section}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">College</h3>
                <p className="text-gray-600">{student.college}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Gender</h3>
                <p className="text-gray-600">{student.gender}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600">{student.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Batch</h3>
                <p className="text-gray-600">{student.batch}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">CGPA</h3>
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    student.cgpa >= 3.5
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {student.cgpa.toFixed(2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Backlogs</h3>
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    student.backlogs === 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.backlogs}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Phone Number</h3>
                <p className="text-gray-600">{student.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
