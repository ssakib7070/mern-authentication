const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Empty Fields
    if (!username || !email || !password) {
      return res.status(201).json({
        success: false,
        error: "Please fill out all field",
      });
    }

    // Password Encryption
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide email & password",
      });
    }

    // Find User
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Password Matching
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(statusCode).json({
    success: true,
    token,
  });
};
