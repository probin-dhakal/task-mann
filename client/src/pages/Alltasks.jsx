import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Home/Cards.jsx";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData.jsx";

function Alltasks() {
  const [tasks, setTasks] = useState([]);
  const [inputDiv, setInputDiv] = useState("hidden");
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited

  // Fetch tasks from the server
  const fetchUserTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/task/getmytasks",
        {
          withCredentials: true,
        }
      );
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching user tasks", error);
    }
  };

  useEffect(() => {
    fetchUserTasks(); // Call the function here
  }, []);

  // Toggle task completion status
  const toggleTaskCompletion = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(
        `http://localhost:8000/api/v1/task/updatetask/${id}`,
        { complete: updatedStatus },
        {
          withCredentials: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, complete: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  // Toggle task importance
  const toggleTaskImportant = async (id, currentImportant) => {
    try {
      const updatedImportant = !currentImportant;
      await axios.put(
        `http://localhost:8000/api/v1/task/updateimportant/${id}`,
        { important: updatedImportant },
        {
          withCredentials: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, important: updatedImportant } : task
        )
      );
    } catch (error) {
      console.error("Error updating task importance", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/task/deletetask/${id}`, {
        withCredentials: true,
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  // Set the task to be edited
  const handleEditTask = (task) => {
    setEditingTask(task);
    setInputDiv("fixed"); // Show the input div when editing
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-200 transition-all duration-300" />
          </button>
        </div>
        <Cards
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          toggleTaskImportant={toggleTaskImportant}
          deleteTask={deleteTask}
          handleEditTask={handleEditTask} // Pass edit function to Cards component
          inputDiv={inputDiv}
          setInputDiv={setInputDiv}
        />
      </div>
      {/* Pass editingTask to InputData for editing */}
      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        refreshTasks={fetchUserTasks}
        editingTask={editingTask} // Pass the task to be edited
        setEditingTask={setEditingTask} // Update task on form submit
      />
    </>
  );
}

export default Alltasks;
