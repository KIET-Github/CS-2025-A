import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [issidebaropen, setIssidebaropen] = useState(false);
  const handlesidebar = () => {
    setIssidebaropen(!issidebaropen);
  };

  const navigate = useNavigate();
    const handleLogout = () => {
      // Remove token and role from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
  
      // Redirect the user to the sign-in page
      window.location.replace("/signin");
    };
  return (
    <>
      <button
        onClick={handlesidebar}
        type="button"
        className="bg-blue-200 rounded-lg fixed top-0 left-0 inline-flex items-center p-2 mt-2 ms-3 text-sm text-blue-500 sm:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-700  dark:focus:ring-blue-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {issidebaropen && (
        <button
          onClick={handlesidebar}
          type="button"
          className="inline-flex bg-blue-200 fixed right-2 top-0 items-center p-2 mt-2 ms-3 text-sm text-blue-500 rounded-lg sm:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-700  dark:focus:ring-blue-600"
        >
          <span className="sr-only">Close Sidebar</span>
          <svg
            className="h-8 w-8 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="18" y1="6" x2="6" y2="18" />{" "}
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:tranblue-x-0 ${
          issidebaropen ? "tranblue-x-0" : "-tranblue-x-full"
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 flex flex-col justify-between py-4 overflow-y-auto bg-blue-100 ">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center p-2 hover:text-white text-blue-900 rounded-lg  hover:bg-blue-700  group">
                <svg
                  className="w-8 h-8 text-blue-500 transition duration-75 dark:text-blue-400  group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Admin</span>
              </div>
            </li>
            <li>
              <Link
                to="/admin/"
                className="flex items-center p-2 hover:text-white text-blue-900 rounded-lg  hover:bg-blue-700  group"
              >
                <svg
                  className="h-8 w-8 hover:text-blue-200 text-blue-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />{" "}
                  <rect x="10" y="12" width="4" height="4" />
                </svg>
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/hods"
                className="flex items-center p-2 hover:text-white text-blue-900 rounded-lg  hover:bg-blue-700  group"
              >
                <svg
                  className="h-8 w-8 hover:text-blue-200 text-blue-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />{" "}
                  <line x1="13" y1="8" x2="15" y2="8" />{" "}
                  <line x1="13" y1="12" x2="15" y2="12" />
                </svg>
                <span className="ms-3">HOD's</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/companies"
                className="flex items-center p-2 hover:text-white text-blue-900 rounded-lg  hover:bg-blue-700  group"
              >
                <svg
                  className="h-8 w-8 hover:text-blue-200 text-blue-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="4" y="4" width="16" height="16" rx="2" />{" "}
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                <span className="ms-3">Companies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/students"
                className="flex items-center p-2 hover:text-white text-blue-900 rounded-lg  hover:bg-blue-700  group"
              >
                <svg
                  className="h-8 w-8 hover:text-blue-200 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="ms-3">Students</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/changepassword"
                className="flex items-center p-2 text-white hover:bg-blue-400 hover:text-blue-900 rounded-lg  bg-blue-700  group"
              >
                <svg
                  className="h-8 w-8 hover:text-blue-200 text-blue-50"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>
                <span className="ms-3">Change Password</span>
              </Link>
            </li>
             <li>
                  <Link
                    to=""
                    onClick={handleLogout} // Call the handleLogout function on click
                    className="flex items-center p-2 text-white hover:text-blue-900 rounded-lg hover:bg-blue-400 bg-blue-700  group"
                  >
                    <svg
                      className="h-8 w-8 hover:text-blue-200 text-blue-50"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                    <span className="ms-3">Log Out</span>
                  </Link>
                </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
