// // AuthContext.js
// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));

//   const login = (token) => {
//     sessionStorage.setItem("token", token);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     sessionStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";

// ✅ Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));

  // ✅ Function to handle login (called from Login component)
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // ✅ Function to handle logout
  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

