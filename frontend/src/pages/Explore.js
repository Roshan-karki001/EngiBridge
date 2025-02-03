// src/pages/Explore.js
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import VacancyForm from "../pages/VacancyForm";

const Explore = () => {
  const { user } = useUser();
  const [showVacancyForm, setShowVacancyForm] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Explore</h1>
      <button
        type="button"
        onClick={() => setShowVacancyForm(true)} // Show the form on click
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login to View Vacancy Form
      </button>
      
      <p className="mt-2">
        Discover new ideas, {user?.F_name || "guest"}!
      </p>

      {/* Conditionally render VacancyForm */}
      {showVacancyForm && (
        <div className="mt-4 p-4 border rounded shadow-lg">
          <VacancyForm />
          <button
            type="button"
            onClick={() => setShowVacancyForm(false)} // Close the form
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close Form
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
