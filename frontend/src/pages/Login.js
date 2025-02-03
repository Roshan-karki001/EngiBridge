import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser(); // Access the context to update user data
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email, // Ensure backend expects 'email'
        password: formData.password,
      });

      if (response.data.user) {
        setUser(response.data.user); // Set user in context
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store in localStorage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token); // Optionally store JWT token
        }
        navigate("/app/dashboard"); // Redirect to dashboard
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
