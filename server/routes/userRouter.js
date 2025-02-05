import express from "express"
import { getMyProfile, login, logout, register } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";




const router = express.Router();

router.post("/register", register);  
router.post("/login", login);
router.get("/myprofile",isAuthenticated ,getMyProfile);
router.get("/logout",isAuthenticated ,logout);



export default router;