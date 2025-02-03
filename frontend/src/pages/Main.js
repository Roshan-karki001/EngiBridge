import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import UserContext

const Main = () => {
  const { user } = useUser(); // Get user data from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  const menuItems = ["Dashboard", "Explore", "My Ideas", "Messages", "Contracts", "Pals"];

  if (!user) return null; // Prevent rendering until authentication check completes

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
