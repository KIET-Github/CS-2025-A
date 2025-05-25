import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./AppliedCompanyCard.css";

// StatusProgress Component
const StatusProgress = ({ currentStatus }) => {
  const statuses = ["Application Submitted", "Under Review", "Interview Process", "Hired"];
  const statusColors = ["bg-blue-500", "bg-pink-500", "bg-yellow-500", "bg-green-500"];

  const statusIndex = statuses.indexOf(currentStatus);

  return (
    <>
    <div className="status-progress flex">
      {statuses.map((status, index) => (
        <div
          key={status}
          className={`status-step ${
            index <= statusIndex ? statusColors[statusIndex] : "bg-gray-300"
          } flex-1 h-2 mx-1`}
        ></div>
      ))}
    </div>
    <div className={`w-full h-5 text-center text-sm text-gray-50 ${statusColors[statusIndex]}`}>
    {currentStatus}
    </div>
    
    </>
  );
};


const AppliedCompanyCard = ({
  id,
  name,
  packageOffer,
  registrationDate,
  imageUrl,
  status, // New prop for the status
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStatus, setShowStatus] = useState(false);

  const handleViewDetails = () => {
    navigate(`${location.pathname}/company/${id}`);
  };

  return (
    <>
      <div className="flip-card m-5">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="bg-white min-w-52 min-h-[250px] max-w-52 shadow-md rounded m-3">
              <div className="h-3/4 w-full">
                <img
                  className="w-full h-full p-5 object-cover rounded-t"
                  src={imageUrl}
                  alt={name}
                />
              </div>
              <div className="w-full h-1/4 p-3">
                <span className="text-lg font-semibold uppercase tracking-wide text-gray-700 hover:text-yellow-600">
                  {name}
                </span>
              </div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="bg-white min-w-52 min-h-[250px] max-w-52 max-h-76 shadow-md rounded m-3 relative">
              <div className="w-full h-1/4 p-3">
                <span className="text-lg font-semibold uppercase tracking-wide text-gray-700 hover:text-yellow-600">
                  {name}
                </span>
                <p className="text-gray-600 text-sm leading-5 mt-1">
                  Package: {packageOffer}
                </p>
                <p className="text-gray-600 text-sm leading-5 mt-1">
                  Registration Till: {registrationDate}
                </p>
                <div className="w-full flex items-center justify-center relative">
                  <button
                    onClick={handleViewDetails}
                    onMouseEnter={() => setShowStatus(true)}
                    onMouseLeave={() => setShowStatus(false)}
                    className="bg-blue-700 rounded-md m-2 p-2 text-gray-200"
                  >
                    View Details
                  </button>
                  {showStatus && (
                    <div className="absolute top-full left-0 mt-2 w-full">
                      <StatusProgress currentStatus={status} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedCompanyCard;
