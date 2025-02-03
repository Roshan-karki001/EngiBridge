// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            {/* Link to corresponding route */}
            <Link
              to={`/${item.toLowerCase().replace(/\s/g, "-")}`} // Converts "My Ideas" -> "/my-ideas"
              className="block py-2 px-4 rounded hover:bg-gray-200"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
