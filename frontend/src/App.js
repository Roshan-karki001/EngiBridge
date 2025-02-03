import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import HomePage from "./pages/homePage";
import SignupPage from "./pages/Signin";
import LoginPage from "./pages/Login";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Main Layout */}
          <Route path="/app" element={<Main />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="explore" element={<Explore />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
