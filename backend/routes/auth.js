const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "anyrandomstringishere";

// ROUTE 1 : creating a user using : POST "/api/auth/createuser".
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 8 characters.").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //if there are any errors in validation return them.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // console.log(user) ;
        return res
          .status(400)
          .json({ error: "Sorry, this email is already taken" });
      }

      //create a new user
      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

//ROUTE 2 : authenticating a user using POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //if there are any errors in validation return them.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      let success = false ;
      if (!user) {
        res
          .status(400)
          .json({ success, error: "Incorrent credentials. Please try again." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Incorrect credentials. Please try again." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true ;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// ROUTE 3 : Get logged in user details using POST : "/api/auth/getuser"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id ;
    const user = await User.findById(userId).select("-password");
    res.send(user) ;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
