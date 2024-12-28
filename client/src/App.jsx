import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Home from "./pages/Home";
import Alltasks from "./pages/Alltasks";
import Importanttasks from "./pages/Importanttasks";
import Completedtasks from "./pages/Completedtasks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Context } from "./main"; // Import the context

function App() {
  const [user, setUser] = useState(null); // User state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/user/myprofile", {
          withCredentials: true, // Ensure cookies are sent
        });
       
        console.log(data.tasks)
        setUser(data.user); // Set the user data received from the server
         // Set the tasks received from the server
        setIsAuthenticated(true); // Set authenticated status to true
      } catch (error) {
        setIsAuthenticated(false); // In case of an error (not authenticated)
        setUser(null); // Clear the user data
         // Clear the tasks data
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile(); // Fetch user data when the component mounts
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <Context.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
        <Router>
          <Toaster />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myprofile" element={<Home />}>
              <Route index element={<Alltasks />} />
              <Route path="importanttasks" element={<Importanttasks />} />
              <Route path="completedtasks" element={<Completedtasks />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
