// src/components/Header.jsx
import React from "react";
import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <div className="h-16 bg-white flex items-center justify-between px-6 border-b">
      <h1 className="text-xl font-semibold text-gray-700">Engibridge</h1>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
        <div className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center text-lg cursor-pointer">
          A
        </div>
      </div>
    </div>
  );
};

export default Header;
