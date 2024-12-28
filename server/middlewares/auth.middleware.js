import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"; // Ensure the path is correct

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(req.cookies); // Logs cookies sent with the request

    // Check if token exists
    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "User is not authenticated" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);

    // Find user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("No user found with the given token ID");
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request
    req.user = user;
    console.log("User authenticated:", user.email);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
