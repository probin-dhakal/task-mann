import React, { useState, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";

function InputData({
  inputDiv,
  setInputDiv,
  refreshTasks,
  editingTask,
  setEditingTask,
}) {
  const [formData, setFormData] = useState({ title: "", desc: "" });

  // If editingTask is provided, pre-fill the form with its data
  useEffect(() => {
    if (editingTask) {
      setFormData({ title: editingTask.title, desc: editingTask.desc });
    } else {
      setFormData({ title: "", desc: "" });
    }
  }, [editingTask]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (editingTask) {
        // Log the task ID and form data for debugging
        console.log("Updating task:", editingTask._id, formData);
        await axios.post(
          `http://localhost:8000/api/v1/task/updatetask/${editingTask._id}`,
          formData,
          { withCredentials: true }
        );
        setEditingTask(null);

        // Reset editing task after submission
      } else {
        // Create a new task
        await axios.post(
          "http://localhost:8000/api/v1/task/createtask",
          formData,
          { withCredentials: true }
        );
      }

      // Clear form and close modal
      setFormData({ title: "", desc: "" });
      setInputDiv("hidden");
      refreshTasks(); // Call the parent method to refresh the task list
    } catch (error) {
      console.error("Error submitting task", error);
    }
  };

  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-3/6 bg-gray-900 h-[57vh] p-4 rounded">
          <div className="flex justify-end">
            <button onClick={() => setInputDiv("hidden")}>
              <ImCross className="text-xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="px-3 py-2 rounded w-full my-3 bg-gray-700"
                required
              />
              <textarea
                name="desc"
                cols="30"
                rows="10"
                placeholder="Description"
                value={formData.desc}
                onChange={handleInputChange}
                className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                required
              ></textarea>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 font-semibold rounded text-white hover:bg-blue-500 transition-all duration-300"
                >
                  {editingTask ? "Update Task" : "Submit"}{" "}
                  {/* Change button text based on editing mode */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default InputData;
