import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const userRef = useRef<HTMLParagraphElement>(null);
  const passRef = useRef<HTMLParagraphElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Changed variable name to follow common conventions

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false; // Flag to track validation errors

    // Validate username
    if (username.trim() === "") {
      if (userRef.current) {
        userRef.current.innerText = "Username is required.";
      }
      hasError = true;
    } else {
      if (userRef.current) {
        userRef.current.innerText = "";
      }
    }

    // Validate password
    if (password.trim() === "") {
      if (passRef.current) {
        passRef.current.innerText = "Password is required.";
      }
      hasError = true;
    } else {
      if (passRef.current) {
        passRef.current.innerText = "";
      }
    }

    // If there are validation errors, stop the submission
    if (hasError) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Using navigate directly without a setTimeout for immediate redirection.
        // If you specifically need a delay, re-add setTimeout.
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error); // Log the actual error for debugging
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <form
        onSubmit={loginSubmit}
        className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700/50 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-teal-400 mb-6 border-b border-gray-700 pb-4">
          Admin Login
        </h2>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username} // Make it a controlled component
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={userRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="text" // Use type="password" for password fields
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} // Make it a controlled component
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm"
          />
          <p ref={passRef} className="text-red-400 text-sm mt-1"></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Adminlogin;