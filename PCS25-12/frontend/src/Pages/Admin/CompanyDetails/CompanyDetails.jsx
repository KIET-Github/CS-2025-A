import React from "react";
import { useParams } from "react-router-dom";
import companies from "../../../SampleData/CompanyList";

const CompanyDetails = () => {
  const { id } = useParams(); // Extract the id parameter from the URL
  const companyId = parseInt(id, 10); // Convert id to integer

  // Check if companyId is NaN
  if (isNaN(companyId)) {
    return (
      <div className="p-4 sm:ml-64 min-h-screen text-gray-200">
        Invalid company ID
      </div>
    );
  }

  const company = companies.find((company) => company.id === companyId);

  if (!company) {
    return (
      <div className="p-4 sm:ml-64 min-h-screen text-gray-200 ">
        Company not found
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64 min-h-screen">
      <div className="mb-4 pb-10 min-h-screen px-8 mx-4 rounded bg-gray-100 border-4 border-blue-400">
        <div className="flex items-center justify-center w-full min-h-[80vh]">
          <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={company.image}
                    width="48"
                    height="48"
                    alt={`${company.name} Logo`}
                    className="mr-4"
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                  />
                  <h2 className="text-2xl font-bold">{company.name}</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  {company.description}
                </p>
                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-muted-foreground"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  <a
                    href={company.contact.website}
                    className="text-primary hover:underline"
                    rel="ugc"
                  >
                    {company.contact.website}
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-muted-foreground"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>{company.contact.phone}</span>
                </div>
                <h3 className="text-lg font-medium my-3">
                  Eligibility Criteria
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  {company.eligibilityCriteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">{company.jobRole}</h2>
                <h3 className="text-lg font-medium mb-2">
                  Job Responsibilities
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  {company.jobResponsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium mb-2">Job Requirements</h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4">
                  {company.jobRequirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-muted-foreground"
                  >
                    <line x1="2" x2="5" y1="12" y2="12"></line>
                    <line x1="19" x2="22" y1="12" y2="12"></line>
                    <line x1="12" x2="12" y1="2" y2="5"></line>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                    <circle cx="12" cy="12" r="7"></circle>
                  </svg>
                  <span>Remote</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">Applied Students</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {company.appliedStudents.map((student, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded shadow-md"
                  >
                    <h3 className="text-lg font-medium">{student.name}</h3>
                    <p className="text-muted-foreground">
                      Date Applied: {student.dateApplied}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mt-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
              <p className="text-muted-foreground mb-6">
                Click the button below to apply for the {company.jobRole}{" "}
                position at {company.name}.
              </p>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-200 hover:bg-primary/90 h-11 rounded-md px-8 w-full max-w-md">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
