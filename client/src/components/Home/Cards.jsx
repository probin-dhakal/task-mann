import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
function Cards({ tasks, toggleTaskCompletion, toggleTaskImportant, deleteTask, handleEditTask, inputDiv, setInputDiv }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {tasks.map((item) => (
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
                className={`${item.important ? "text-red-500" : "text-gray-400"}`}
              >
                <FaHeart />
              </button>
              <button onClick={() => handleEditTask(item)}>
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(item._id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => setInputDiv("fixed")} className="flex flex-col items-center text-gray-300 justify-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300">
        <IoAddCircleSharp className="text-6xl" />
        <h2 className="text-2xl mt-5">Add Tasks</h2>
      </button>
    </div>
  );
}

export default Cards;
