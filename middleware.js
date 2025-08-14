// /**
//  * @param {import('express').Request} req
//  * @param {import('express').Response} res
//  */

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressErrors.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    //original url save (redirect url)
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash(
      "error",
      "You are not authorized to perform the relevant action."
    );
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  console.log(listingSchema.validate(req.body));
  let { error } = listingSchema.validate(req.body);
  if (error) {
    console.log("error occurred");
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  let review = await Review.findById(req.params.reviewId);
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash(
      "error",
      "You are not authorized to perform the relevant action."
    );
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
};
