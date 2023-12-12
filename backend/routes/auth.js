const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "thisismysecrethaha";
var fetchuser = require('../middleware/fetchuser');


//ROUTE 1: Create a User using: POST "/api/auth". Doesn't require Auth
router.post(
  "/register",
  [
    body("name", "The name should be atleast 3 characters long").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "The password should be atleast 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          status: "Failure",
          message: "A user with this mail already exists.",
        });
      }

      const salt = 10;
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            status: "Failure",
            message: "Registration failed",
          });
        }
        user = await User.create({
          name: req.body.name,
          password: hash,
          email: req.body.email,
        });
        const data = {
          id: user.id,
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        return res.status(200).json({
          status: "Successful",
          token: authtoken,
          message: "Registration successful",
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Failure",
        message: "Internal Server Error",
      });
    }
  }
);

//ROUTE 2: this is user login and also generating jwt token
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "The password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: "Failure",
          message: "Please login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          status: "Failure",
          message: "Please login with correct credentials",
        });
      }

      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({
        status: "Successful",
        token: authtoken,
        message: "Login successful",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "Failure",
        message: "Internal Server Error",
      });
    }
  }
);

//ROUTE 3: Get loggedin user details using POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
