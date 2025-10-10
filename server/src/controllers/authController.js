import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_EXPIRE = "7d"; 

// ✅ Generate token helper
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

  // Store JWT in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// ---------------- Signup ----------------
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // ✅ Generate token & set cookie
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Signin ----------------
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate token & set cookie
    generateToken(res, user._id);

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Logout ----------------
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
};

// ---------------- Profile ----------------
export const profile = (req, res) => {
  res.json(req.user);
};
