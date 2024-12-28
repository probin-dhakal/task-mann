import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "react-router-dom"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data)

      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");

      toast.success(data.message);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 flex items-center justify-center gap-1">
          Register to{" "}
          <p>
            {" "}
            <span className="text-gray-300 text-xl">Up</span>
            <span className="text-green-400 text-xl">Task</span>{" "}
          </p>
        </h2>
        <form onSubmit={handleRegister}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border bg-slate-300 border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
              placeholder="Enter your name"
              required
            />
          </div>

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
              className="block text-sm font-medium  text-gray-300 mb-2"
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

          {/* Avatar Field */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full px-4 py-2 border bg-slate-700 border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              accept="image/*"
            />
          </div>

          <p className="text-sm text-gray-400 mb-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-400 hover:underline">
              Login Now
            </Link>
          </p>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
