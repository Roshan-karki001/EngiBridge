// src/pages/Dashboard.js
import React from "react";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">
        Welcome back, {user?.F_name || "User"}!
      </p>
    </div>
  );
};

export default Dashboard;
