import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../main"; // Import the Context to access the global state

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  // Access the global state for user and authentication status
  const { setUser, setIsAuthenticated } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make API request to login
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // On success, update user and authentication state
      setUser(data.user); // Set user data
      setIsAuthenticated(true); // Set authentication state

      toast.success(data.message);
      setEmail(""); // Clear input fields
      setPassword("");
      navigateTo("/myprofile"); // Redirect to the profile page
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 flex items-center justify-center gap-1">
          Login to{" "}
          <p>
            {" "}
            <span className="text-gray-300 text-xl">Up</span>
            <span className="text-green-400 text-xl">Task</span>{" "}
          </p>
        </h2>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border bg-slate-300 border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border bg-slate-300 border-gray-500 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register Link */}
          <p className="text-sm text-gray-400 mb-4">
            Don't have an account?{" "}
            <Link to={"/"} className="text-blue-400 hover:underline">
              Register Now
            </Link>
          </p>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
