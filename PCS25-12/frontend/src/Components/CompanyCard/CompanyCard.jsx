import { useNavigate, useLocation } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({
  id,
  name,
  packageOffer,
  registrationDate,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

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
            <div className="bg-white min-w-52 min-h-[250px] max-w-52 max-h-76 shadow-md rounded m-3">
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
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={handleViewDetails}
                    className="bg-blue-700 rounded-md m-2 p-2 text-gray-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="bg-white min-w-52 min-h-76 max-w-52 max-h-76 shadow-md rounded m-3">
    //   <div className="h-3/4 w-full">
    //     <img
    //       className="w-full h-full p-5 object-cover rounded-t"
    //       src={imageUrl}
    //       alt={name}
    //     />
    //   </div>
    //   <div className="w-full h-1/4 p-3">
    //     <span className="text-lg font-semibold uppercase tracking-wide text-gray-700 hover:text-yellow-600">
    //       {name}
    //     </span>
    //     <p className="text-gray-600 text-sm leading-5 mt-1">
    //       Package: {packageOffer}
    //     </p>
    //     <p className="text-gray-600 text-sm leading-5 mt-1">
    //       Registration Till: {registrationDate}
    //     </p>
    //     <div className="w-full flex items-center justify-center">
    //       <button
    //         onClick={handleViewDetails}
    //         className="bg-blue-700 rounded-md m-2 p-2 text-gray-200"
    //       >
    //         View Details
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CompanyCard;
