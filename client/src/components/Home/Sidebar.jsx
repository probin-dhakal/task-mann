import React, { useContext } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main"; // Correct import for Context

function Sidebar() {
  const { user } = useContext(Context); // Access the context and logout function
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      setUser(null); // Clear the user context
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout method from the context
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="flex gap-3 flex-col mt-2">
        <h2 className="text-xl font-semibold mb-2">
          <span className="text-gray-200">Up</span>
          <span className="text-green-400">Task</span>
        </h2>
        {/* Use user data from context */}
        <img src={user?.avatar.url} alt="User Avatar" className="h-[100px] border rounded-full" />
        <h3 className="my-2 text-gray-400 font-semibold mb-1">{user?.name || "User"}</h3>
        <hr />
      </div>

      <div className="text-gray-300 flex flex-col gap-4">
        {/* All Tasks Link */}
        <Link to="/myprofile" className="flex gap-1 items-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-all duration-300">
          <span><CgNotes /></span> All Tasks
        </Link>

        {/* Important Tasks Link */}
        <Link to="/myprofile/importanttasks" className="flex gap-1 items-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-all duration-300">
          <span><MdLabelImportant /></span> Important Tasks
        </Link>

        {/* Completed Tasks Link */}
        <Link to="/myprofile/completedtasks" className="flex gap-1 items-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-all duration-300">
          <span><FaCheckDouble /></span> Completed Tasks
        </Link>
      </div>

      <div className="">
        <button 
          onClick={handleLogout} 
          className="bg-yellow-700 hover:bg-yellow-600 lg:w-[150px] md:w-[100px] sm:w-[100px] p-2 rounded"
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
