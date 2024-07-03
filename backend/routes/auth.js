const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "anyrandomstringishere"

// creating a user using : POST "/api/auth/createuser".
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
        user : {
          id : User.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET) ;
      res.json({authtoken}) ;

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
