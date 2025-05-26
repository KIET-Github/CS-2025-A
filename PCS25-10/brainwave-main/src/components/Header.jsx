//WORKING IF WAANT TO ROLL BACK USE THIS

// import { useLocation, Link, useNavigate } from "react-router-dom";  
// import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import { brainwave } from "../assets";
// import { navigation } from "../constants";
// import Button from "./Button";
// import MenuSvg from "../assets/svg/MenuSvg";
// import { HamburgerMenu } from "./design/Header";
// import { useState, useEffect } from "react";

// const Header = () => {
//   const pathname = useLocation();
//   const navigate = useNavigate(); // ✅ Used for redirecting
//   const [openNavigation, setOpenNavigation] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Track login status

//   // ✅ Check if the user is logged in on component mount
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     setIsLoggedIn(!!token); // Convert token existence to boolean
//   }, []);

//   // ✅ Logout function
//   const handleLogout = () => {
//     sessionStorage.removeItem("token"); // Remove token
//     setIsLoggedIn(false); // Update state
//     navigate("/login"); // Redirect to login page
//   };

//   const toggleNavigation = () => {
//     if (openNavigation) {
//       setOpenNavigation(false);
//       enablePageScroll();
//     } else {
//       setOpenNavigation(true);
//       disablePageScroll();
//     }
//   };

//   const handleClick = () => {
//     if (!openNavigation) return;
//     enablePageScroll();
//     setOpenNavigation(false);
//   };

//   return (
//     <div 
//       className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm  ${
//         openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
//       }`}
//     >
//       <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
//         <a className="block w-[12rem] xl:mr-8" href="#hero">
//           <img src={brainwave} width={190} height={40} alt="Brainwave" />
//         </a>

//         <nav
//           className={`${
//             openNavigation ? "flex" : "hidden"
//           } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
//         >
//           <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
//             {navigation.map((item) => (
//               <Link
//                 key={item.id}
//                 to={item.url}
//                 onClick={handleClick}
//                 className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
//                   item.onlyMobile ? "lg:hidden" : ""
//                 } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
//                   item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
//                 } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </div>

//           <HamburgerMenu />
//         </nav>

//         {/* ✅ Show Logout if logged in, otherwise show Sign Up & Sign In */}
//         {isLoggedIn ? (
//           <button 
//             onClick={handleLogout} 
//             className="button hidden mr-8 text-red-500 hover:text-red-700 transition-colors lg:block"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/signup"
//               className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
//             >
//               New account
//             </Link>

//             <Link to="/login">
//               <Button className="hidden lg:flex">
//                 Sign in
//               </Button>
//             </Link>
//           </>
//         )}

//         <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
//           <MenuSvg openNavigation={openNavigation} />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Header;

import { useLocation, Link, useNavigate } from "react-router-dom";  
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {floodwave} from "../assets";
import { floodwave2 } from "../assets";
import { floodwave3 } from "../assets";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);

  // Use the AuthContext to get the current auth state and logout function.
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Logout function that calls the context's logout and then redirects.
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm  ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="/">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === location.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {/* Show Logout if logged in, otherwise show Sign Up & Sign In */}
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="button hidden mr-8 text-red-500 hover:text-red-700 transition-colors lg:block"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </Link>

            <Link to="/login">
              <Button className="hidden lg:flex">
                Sign in
              </Button>
            </Link>
          </>
        )}

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
