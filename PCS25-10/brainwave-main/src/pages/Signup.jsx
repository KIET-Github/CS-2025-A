// import { useState } from "react";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });
//     const data = await response.json();
//     alert(data.message); // Show success/error message
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4"
//       >
//         <h2 className="text-black text-xl font-semibold text-center">Signup</h2>
        
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const { login } = useContext(AuthContext); // Access login function from AuthContext
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     console.log("Backend response:", data); // Check the full response in the console

//     alert(data.message); // Show success/error message

//     if (data.message === "User registered successfully") {
//         // If the message indicates successful signup, proceed with login
//         login(data.token); // If your backend sends a token, log the user in
//         navigate("/"); // Redirect to home
//     } else {
//         // Handle the case where signup failed
//         console.log("Signup failed:", data.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4"
//       >
//         <h2 className="text-black text-xl font-semibold text-center">Signup</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="border p-2 rounded"
//           onChange={handleChange}
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [notification, setNotification] = useState("");  // State to store notification message
  const [notificationType, setNotificationType] = useState(""); // 'success' or 'error'
  const [isNotificationVisible, setIsNotificationVisible] = useState(false); // Show notification or not
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Backend response:", data); // Check the full response in the console

    if (data.message === "User registered successfully") {
      setNotification("Account created successfully!"); // Set the success message
      setNotificationType("success"); // Set notification type as success
      setIsNotificationVisible(true); // Show notification

      // If the backend sends a token, log the user in
      login(data.token);
      setTimeout(() => navigate("/"), 1000); // Redirect to home after 3 seconds
    } else {
      setNotification(data.message); // Set the error message
      setNotificationType("error"); // Set notification type as error
      setIsNotificationVisible(true); // Show notification
    }
  };

  useEffect(() => {
    if (isNotificationVisible) {
      const timer = setTimeout(() => {
        setIsNotificationVisible(false); // Hide notification after 3 seconds
      }, 1000); // Notification stays for 3 seconds

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [isNotificationVisible]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {isNotificationVisible && (
        <div
          className={`fixed left-0 top-16 m-4 p-4 rounded-lg shadow-lg transition-all transform ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          } ${
            isNotificationVisible ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            transition: "transform 0.1s ease-out", // Apply sliding animation
          }}
        >
          <div className="flex justify-between items-center">
            <span className="text-white">{notification}</span>
            <button
              onClick={() => setIsNotificationVisible(false)}
              className="text-white ml-4 bg-transparent border-0 focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4"
      >
        <h2 className="text-black text-xl font-semibold text-center">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
