import React, { useEffect, useState } from "react";
import HodList from "../../../Components/HodList/HodList";
import { Link } from "react-router-dom";
import { getAllHods } from "../../../api/Admin/Admin.api";

const AllHod = () => {
  const [hods, setHods] = useState([]); // Initially empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHods = async () => {
      try {
        const response = await getAllHods();
        console.log("API Response:", response); // Log the response here

        if (response && Array.isArray(response)) {
          setHods(response[0]); // Assuming you want the first array in the response
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error fetching HOD data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHods();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading message while fetching
  if (error) return <div>Error: {error}</div>; // Show error message if any error occurs

  return (
    <div className="p-4 sm:ml-64 min-h-screen">
      <div className="mb-4 pb-10 min-h-screen px-8 mx-4 rounded">
        <div className="text-gray-100 font-bold text-3xl p-5">HODs</div>
        <HodList data={hods} /> {/* Pass the data to the HodList component */}
        <br />
        <Link
                to="/addHOD"
                className=""
              >
                
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add HOD</button>
                
              </Link>
      </div>
    </div>
  );
};

export default AllHod;
