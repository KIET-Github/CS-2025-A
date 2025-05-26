import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentLogin } from '../../../api/Student/Student.api';
import { companyLogin } from '../../../api/Company/Company.api';
import { Eye, EyeOff } from 'lucide-react'; 
import { adminLogin } from '../../../api/Admin/Admin.api';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      console.log(data.user);
      const { token, user } = data;
    

      // Save the token and role in localStorage
      localStorage.setItem("token", token);
      if (user.s_id) {
        localStorage.setItem("studentId", user.s_id); // Store studentId if the user is a student
      }
      localStorage.setItem("role", user.role);

      // Redirect based on the role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "hod") {
        navigate("/hod-dashboard");
      } else if (user.role === "company") {
        navigate("/company");
      } else if (user.role === "student") {
        navigate("/student");
      }
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
        <form className="space-y-6" onSubmit={handleLogin}>

          {/* Role Selection */}
          {/* <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            >
              <option value="student">Student</option>
              <option value="admin">Admin/Hod</option>
              <option value="company">Company</option>
            </select>
          </div> */}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          {/* Password Input */}
<div>
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="block w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
      placeholder="Enter your password"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>


          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            >
              Sign In
            </button>
          </div>
          <div className='justify-end flex'><button className=' rounded-full p-2'>Forget Password ?</button></div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
