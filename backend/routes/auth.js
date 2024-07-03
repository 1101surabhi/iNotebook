const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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
    let user = await User.findOne({email : req.body.email})
    if (user){
      // console.log(user) ;
      return res.status(400).json({error : "Sorry, this email is already taken"}) ;
    }

    //create a new user
    user = await Userg.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
    res.json(user) ;
  } catch (error){
    console.log(error.message) ;
    res.status(500).send("Some error occurred") ;
  }
  }
);

module.exports = router;
