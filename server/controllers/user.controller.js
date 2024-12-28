import { User } from "../models/user.models.js";
import cloudinary from "cloudinary";
import { sendToken } from "../UTILS/jwtToken.js";

export const register = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new Error("User avatar is required", 400));
  }
  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new Error(
        "Invalid image format please provide one of these (png/jpg/jpeg/webp)",
        400
      )
    );
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new Error("Please fill all details", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new Error("Failed to upload avatar. Please try again.", 500));
  }

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  sendToken(newUser, 201, "User registered successfully", res);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("Please provide full details", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new Error("Invalid email or password", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Error("Invalid email or password", 400));
  }

  sendToken(user, 200, "User logged in successfully", res);
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

export const getMyProfile = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};
