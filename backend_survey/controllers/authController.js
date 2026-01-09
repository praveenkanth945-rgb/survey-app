import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Fixed user credentials
const FIXED_USER = {
  email: "praveenkanth945@gmail.com",
  password: "Praveen@24",
  fullName: "Praveen Kanth"
};

// In-memory storage for testing
let users = [FIXED_USER];

// Register user
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if email is empty
    if (!email || !fullName || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists with this email" 
      });
    }

    // Create new user
    const newUser = {
      _id: 'user_' + Date.now(),
      fullName,
      email: email.toLowerCase(),
      password, // In production, hash this password
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);

    console.log('New user registered:', newUser.email);
    console.log('Total users:', users.length);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Check fixed user
    if (email.toLowerCase() === FIXED_USER.email.toLowerCase()) {
      if (password === FIXED_USER.password) {
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: {
            id: "fixed_user",
            fullName: FIXED_USER.fullName,
            email: FIXED_USER.email
          }
        });
      }
    }

    // Check other users
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email
        }
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid email or password"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

// Get all users (for debugging)
export const getUsers = (req, res) => {
  res.json({
    success: true,
    count: users.length,
    users: users.map(u => ({ email: u.email, fullName: u.fullName }))
  });
};