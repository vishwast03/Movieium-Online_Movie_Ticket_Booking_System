const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchUser = require("../middleware/fetchUser");

const privateKey = process.env.JWT_SECRET;

// ROUTE 1: Create User using: POST "/api/auth/createuser" - No login required
router.post(
  "/createuser",
  [
    body("name", "Enter name").isString(),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter valid phone number").isMobilePhone(),
    body("password", "Enter a password (at least 8 characters)").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hashSync(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone,
        password: secPassword,
      });

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, privateKey);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login" - No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, privateKey);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get Logged In User Info using: GET "/api/auth/getuser" - Login required
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
