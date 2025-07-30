const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/staywise";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

//Root
app.get("/", (req, res) => {
  res.send("Hello World! Root Here");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  console.log(res.locals.success);
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// app.all("*", (req, res, next) => {                 //I need to check why this is not working
//   next(new ExpressError(404, "Page Not Found"));
// });

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).render("errors/error.ejs", { status, message });
  // res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
