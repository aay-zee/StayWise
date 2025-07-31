const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");

//Signup Form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//Signup Logic
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log("New User Registered:", registeredUser);
      req.flash("success", "Welcome to Staywise!");
      res.redirect("/listings");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

//Login Form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

//Login Logic
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  }
);

module.exports = router;
