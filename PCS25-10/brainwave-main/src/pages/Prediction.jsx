import { useEffect } from "react";

const Prediction = () => {
  useEffect(() => {
    console.log("✅ HowToUse component mounted!"); // Debugging
  }, []);

  return (
    // <div className="text-white p-10">
    //   <h1 className="text-3xl font-bold">How to Use</h1>
    //   <p className="mt-4">This page contains instructions on how to use the platform.</p>
    // </div>
    <div className="ml-page-container">
            <iframe
                src="http://localhost:5174"  // The URL of your ML page (running locally on port 5000)
                title="Machine Learning Predictions"
                width="100%"  // Adjust width as needed
                height="800px"  // Adjust height as needed
                style={{ border: 'none' }}  // Optional: remove the iframe border
                allow="geolocation"
            />
      </div>

  );
};

export default Prediction;




