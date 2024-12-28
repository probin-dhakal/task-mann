import { Task } from "../models/task.models.js";

export const create = async (req, res) => {
  try {
    const { title, desc } = req.body;

    // Ensure the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized. Please log in to create a task.",
      });
    }

    // Validate the request body
    if (!title || !desc) {
      return res.status(400).json({
        message: "Title and description are required.",
      });
    }

    // Create the task with the creator's ID
    const task = await Task.create({
      title,
      desc,
      creator: req.user.id, // Associate the task with the logged-in user
    });

    // Send success response
    return res.status(201).json({
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    // Send error response
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized. Please login to view your task",
      });
    }

    const tasks = await Task.find({ creator: req.user.id });

    return res.status(200).json({
      message: "Tasks retrieved successfully.",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getImportantTasks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized. Please log in to view important tasks.",
      });
    }

    const importantTasks = await Task.find({
      creator: req.user.id,
      important: true,
    });

    console.log(importantTasks);
    return res.status(200).json({
      message: "Important tasks retrieved successfully.",
      tasks: importantTasks,
    });
  } catch (error) {
    console.error("Error fetching important tasks:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getCompletedTasks = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized. Please log in to view completed tasks.",
      });
    }

    const completedTasks = await Task.find({
      creator: req.user.id,
      complete: true,
    });

    console.log(completedTasks);
    return res.status(200).json({
      message: "Completed tasks retrieved successfully.",
      tasks: completedTasks,
    });
  } catch (error) {
    console.error("Error fetching completed tasks:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateCompleted = async (req,res) => {

  try {
    const { id } = req.params;
    const { complete } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { complete },
      { new: true }
    );

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
}
export const updateImportant = async (req,res) => {

  try {
    const { id } = req.params;
    const { important } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { important },
      { new: true }
    );

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(id);

    // If the task is not found
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Update task function
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, desc } = req.body;

  try {
    // Log the incoming data for debugging
    console.log("Updating task with ID:", taskId);
    console.log("New title:", title);
    console.log("New description:", desc);

    // Find the task by ID and update its fields
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, desc }, // Updated fields
      { new: true } // Returns the updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Log the updated task
    console.log("Updated task:", task);

    // Send back the updated task
    res.status(200).json({
      message: "Updated task",
      task
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error while updating task" });
  }
};
