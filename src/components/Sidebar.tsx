import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen flex">
      <div
        className={`bg-gray-800 text-white ${
          isOpen ? "w-64" : "w-12"
        } transition-all duration-300 ease-in-out h-full flex flex-col`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none p-4"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {isOpen && (
          <>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className={isOpen ? "inline" : "hidden"} ml-2>
                    Contacts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/charts"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className={isOpen ? "inline" : "hidden"} ml-2>
                    Charts and Maps
                  </span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
