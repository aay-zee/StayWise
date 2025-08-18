const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");
const user = require("../models/user.js");

router
  .route("/signup")
  //Signup Form
  .get(usersController.renderSignupForm)
  //Signup Logic
  .post(wrapAsync(usersController.signup));

router
  .route("/login")
  //Login Form
  .get(usersController.renderLoginForm)
  //Login Logic
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.login
  );

router.get("/logout", usersController.logout);

module.exports = router;
