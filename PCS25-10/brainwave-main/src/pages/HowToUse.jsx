import { useEffect } from "react";

const HowToUse = () => {
  useEffect(() => {
    console.log("✅ HowToUse component mounted!"); // Debugging
  }, []);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">How to Use</h1>
      <p className="mt-4">This page contains instructions on how to use the platform.</p>
    </div>
  );
};

export default HowToUse;
