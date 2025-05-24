import React, { useContext, useState } from "react";
import profile from "../../assets/images/profile.png";
import styles from "./index.module.scss";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.nav}>
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img src={profile} className={styles.profileImage} />
        </div>
      </div>
      {showDropdown && (
        <div
          className={styles.dropdown}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className={styles.dropdownItem}>
            {" "}
            <CiUser />
            {username}
          </div>
          <div
            className={styles.logout}
            onClick={() => {
              localStorage.setItem("token", "");
              localStorage.setItem("username", "");
              navigate("/login");
              toast.success("You have been logged out successfully.");
            }}
          >
            <IoIosLogOut />
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
