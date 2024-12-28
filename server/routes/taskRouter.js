import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { create, deleteTask, getCompletedTasks, getImportantTasks, getMyTasks, updateCompleted, updateImportant, updateTask } from "../controllers/task.controller.js";




const router = express.Router();


router.post("/createtask", isAuthenticated,create);  
router.get("/getmytasks", isAuthenticated,getMyTasks);  
router.get("/getimportanttasks", isAuthenticated,getImportantTasks);  
router.get("/getcompletedtasks", isAuthenticated,getCompletedTasks);  
router.put("/updatetask/:id",isAuthenticated,updateCompleted);//completed updation
router.put("/updateimportant/:id",isAuthenticated,updateImportant)
router.delete("/deletetask/:id",isAuthenticated,deleteTask)
router.post("/updatetask/:taskId",isAuthenticated,updateTask)

export default router;