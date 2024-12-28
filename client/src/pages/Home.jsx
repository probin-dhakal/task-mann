import React, { useContext } from "react";
import Sidebar from "../components/Home/Sidebar";
import { Context } from "../main"; // Import context to access user data
import { Outlet } from "react-router-dom"; 

function Home() {
  const { user } = useContext(Context); // You can access the user data here as well

  return (
    <div className="flex h-[98vh] gap-4">
      <div className="w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col items-center justify-between">
        <Sidebar /> {/* Sidebar will consume user data from context */}
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl p-4">
        {/* You can display other content here, such as tasks or user details */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
