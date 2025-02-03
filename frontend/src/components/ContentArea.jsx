// src/components/ContentArea.jsx
import React from "react";

const ContentArea = ({ selectedPage }) => {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPage}</h2>
      <p className="text-gray-600">This is the {selectedPage} page.</p>
    </div>
  );
};

export default ContentArea;
