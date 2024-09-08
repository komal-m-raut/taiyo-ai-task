import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 transition-width duration-300`}
    >
      <button onClick={toggleSidebar} className="p-4 text-white">
        {isOpen ? "Close" : "Open"}
      </button>
      <ul className="mt-4 text-white">
        <li>
          <Link to="/">Contacts</Link>
        </li>
        <li>
          <Link to="/charts">Charts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
