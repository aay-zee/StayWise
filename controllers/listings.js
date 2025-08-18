const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  // console.log(listings);
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  // console.log(listing);
  if (!listing) {
    console.log("Listing does not exist!");
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  //geocoding here
  let { url } = req.file;
  let { filename } = req.file;
  let listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  listing.image = { url, filename };
  await listing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    console.log("Listing does not exist!");
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  let originalImageURL = listing.image.url;
  originalImageURL = originalImageURL.replace(
    "/upload",
    "/upload/h_100,w_100,e_blur:500"
  );
  res.render("listings/edit.ejs", { listing, originalImageURL });
};

module.exports.updateListing = async (req, res) => {
  let listing = await Listing.findByIdAndUpdate(req.params.id, {
    ...req.body.listing,
  });
  if (typeof req.file !== "undefined") {
    let { url } = req.file;
    let { filename } = req.file;
    listing.image = { url, filename };
    await listing.save();
  }
  console.log(listing);
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  let deletedListing = await Listing.findByIdAndDelete(req.params.id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
