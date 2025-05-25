// SelectDropdown.js
import React, { useState, useRef } from "react";

const SelectDropdown = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLanguageSelection = (language) => {
    setLanguage(language);
    setOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex grid min-h-screen w-full place-items-center">
      <div ref={dropdownRef} className="relative w-[30rem]">
        <button
          onClick={toggleDropdown}
          className={`flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300 ${
            open ? "ring-blue-600" : ""
          }`}
        >
          <span>{language === "" ? "Choose language" : language}</span>
          <i className="fas fa-chevron-down text-xl"></i>
        </button>

        {open && (
          <ul className="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
            {["Python", "PHP", "C#"].map((lang) => (
              <li
                key={lang}
                className="cursor-pointer select-none p-2 hover:bg-gray-200"
                onClick={() => handleLanguageSelection(lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
