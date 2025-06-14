const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

//Root
app.get("/", (req, res) => {
  res.send("Hello World! Root Here");
});

//Index Route
app.get("/listings", async (req, res) => {
  let listings = await Listing.find({});
  // console.log(listings);
  res.render("listings/index.ejs", { listings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
});

//Cretae Route
app.post("/listings", async (req, res) => {
  let listing = new Listing(req.body.listing);
  await listing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let listing = await Listing.findByIdAndUpdate(req.params.id, {
    ...req.body.listing,
  });
  console.log(listing);
  res.redirect(`/listings/${listing._id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let deletedListing = await Listing.findByIdAndDelete(req.params.id);
  console.log(deletedListing);
  res.redirect("/listings");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
