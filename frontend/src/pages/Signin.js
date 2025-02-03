import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    F_name: "",
    L_name: "",
    G_mail: "",
    Phonenumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = {};

    if (!formData.F_name) tempErrors.F_name = "First name is required.";
    if (!formData.L_name) tempErrors.L_name = "Last name is required.";
    if (!formData.G_mail) {
      tempErrors.G_mail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.G_mail)) {
      tempErrors.G_mail = "Invalid email address.";
    }
    if (!formData.Phonenumber || !/^\d{10}$/.test(formData.Phonenumber)) {
      tempErrors.Phonenumber = "Phone number must be 10 digits.";
    }
    if (!formData.password || formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(tempErrors);
    valid = Object.keys(tempErrors).length === 0;
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/api/register", formData);
        setSuccessMessage(response.data.message || "Registration successful!");
        setErrorMessage("");
        setFormData({
          F_name: "",
          L_name: "",
          G_mail: "",
          Phonenumber: "",
          password: "",
        });
        // After successful registration, navigate to the login page
        navigate("/login");
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Error registering user.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h1>
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="F_name" className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                id="F_name"
                name="F_name"
                value={formData.F_name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {errors.F_name && <p className="text-red-500 text-xs">{errors.F_name}</p>}
            </div>
            <div>
              <label htmlFor="L_name" className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                id="L_name"
                name="L_name"
                value={formData.L_name}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {errors.L_name && <p className="text-red-500 text-xs">{errors.L_name}</p>}
            </div>
            <div>
              <label htmlFor="G_mail" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="G_mail"
                name="G_mail"
                value={formData.G_mail}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {errors.G_mail && <p className="text-red-500 text-xs">{errors.G_mail}</p>}
            </div>
            <div>
              <label htmlFor="Phonenumber" className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                id="Phonenumber"
                name="Phonenumber"
                value={formData.Phonenumber}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {errors.Phonenumber && <p className="text-red-500 text-xs">{errors.Phonenumber}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
