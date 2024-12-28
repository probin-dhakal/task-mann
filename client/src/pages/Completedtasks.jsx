import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Completedtasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/task/getmytasks",
          {
            withCredentials: true,
          }
        );
        // Filter tasks with complete === true
        setTasks(data.tasks.filter((task) => task.complete));
      } catch (error) {
        console.error("Error fetching user tasks", error);
      }
    };

    fetchUserTasks();
  }, []);

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
      // Update the tasks state and remove tasks that are no longer completed
      setTasks((prevTasks) =>
        prevTasks
          .map((task) =>
            task._id === id ? { ...task, complete: updatedStatus } : task
          )
          .filter((task) => task.complete)
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

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

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/task/deletetask/${id}`, {
        withCredentials: true,
      });
      // Update the tasks state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <>
    <div className="grid grid-cols-4 gap-4 p-4">
      {tasks.length > 0 ? (
        tasks.map((item) => (
          <div
            key={item._id}
            className="bg-gray-700 rounded-sm p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                onClick={() => toggleTaskCompletion(item._id, item.complete)}
                className={`px-2 py-1 rounded ${
                  item.complete ? "bg-green-400" : "bg-red-400"
                }`}
              >
                {item.complete ? "Complete" : "Incomplete"}
              </button>
              <div className="flex justify-around text-2xl w-3/6 p-2">
                <button
                  onClick={() => toggleTaskImportant(item._id, item.important)}
                  className={`${
                    item.important ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <CiHeart />
                </button>
                <button>
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(item._id)}>
                  <MdDelete className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-4 text-center text-gray-300 bg-gray-800 p-4 rounded-sm">
          <h2 className="text-2xl">NO COMPLETED TASKS YET</h2>
        </div>
      )}
    </div>
     
    </>
  );
}

export default Completedtasks;
