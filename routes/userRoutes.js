import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//route create

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);

    // console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data error",
      });
    }

    // res.send(errors); database me save
    const { username,email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hash,
    });

    res.json(newUser);
  }
);

//login

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",

  body("username").trim().isLength({ min: 4 }),
  body("password").trim().isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data error",
      });
    }

    const { username, password } = req.body;

    const user = await User.findOne({
        username : username

    })

    if(!user){
        return res.status(400).json({
            message : 'username or password is incorrect',
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({
            message : 'username or password is incorrect',
        })
    }

    //email or paas check ho gye h ab tokens genrate

    const token = jwt.sign({
        userId: user_id,
        email: user.email,
        username: user.username

    },
    process.env.JWT_SECRET,

)

//only screen pr dekhne ke liye

res.json({
    token
}) 





  }
);

// module.exports = router;
export default router; //
