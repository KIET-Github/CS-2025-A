// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import ButtonGradient from "./assets/svg/ButtonGradient";

// const App = () => {
//   return (
//     <>
//       <Header /> {/* Navbar stays on all pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//       <ButtonGradient /> {/* Footer effect remains on all pages */}
//     </>
//   );
// };

// export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Features from "./pages/Features";
import Pricing from "./components/Pricing"
//import prediction from "./pages/prediction";
import Roadmap from "./components/Roadmap";
import Prediction from "./pages/Prediction";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <>
      <Header />
      <div className="pt-20">  {/* Add padding to prevent overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route 
          path="/Prediction" 
          element={
            <PrivateRoute>
             <Prediction />
            </PrivateRoute>} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;


