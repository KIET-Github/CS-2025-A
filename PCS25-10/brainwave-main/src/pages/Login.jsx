// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // ✅ Redirect user after login

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); 
  
//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const data = await response.json();
//       console.log("API Response:", data); // ✅ Debugging output
  
//       if (response.ok) {
//         sessionStorage.setItem("token", data.token); // ✅ Store in sessionStorage
//         console.log("Token Stored:", sessionStorage.getItem("token")); // ✅ Debug
//         navigate("/");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("Server error. Try again.");
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col space-y-4"
//       >
//         <h2 className="text-black text-xl font-semibold text-center">Login</h2>

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

//         {error && <p className="text-red-500 text-center">{error}</p>} {/* ✅ Show errors */}

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Simulate API call (replace with actual API call)
//     const fakeToken = "123456789";
//     sessionStorage.setItem("token", fakeToken);

//     login(fakeToken); // ✅ Call login function to update context

//     navigate("/"); // Redirect to home
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="email" 
//         placeholder="Email" 
//         value={formData.email} 
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//       />
//       <input 
//         type="password" 
//         placeholder="Password" 
//         value={formData.password} 
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // ✅ Handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new submission

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token); // ✅ Save token in AuthContext
      navigate("/"); // ✅ Redirect to home

    } catch (err) {
      setError(err.message); // ✅ Display error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Login</h2>

      {error && <p className="text-red-500">{error}</p>} {/* ✅ Show error if any */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
