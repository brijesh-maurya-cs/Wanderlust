const Listing = require("../Models/listing");
const { cloudinary } = require("../cloudConfig.js");

module.exports.index = async (req, res) => {
  const { category } = req.query;
  const search = req.query.search;
  let allListings;

  if (search) {
    allListings = await Listing.find({
      $or: [
        { country: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    });
    if (allListings.length === 0) {
      req.flash("error", "No listings found for your search!");
      return res.redirect("/listings");
    }
  } else if (category) {
    allListings = await Listing.find({
      category: { $regex: new RegExp("^" + category + "$", "i") },
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${req.body.listing.location},${req.body.listing.country}&format=json`,
    {
      headers: {
        "User-Agent": "WanderlustApp/1.0",
      },
    },
  );
  const geoData = await geoResponse.json();

  if (!geoData || geoData.length === 0) {
    req.flash("error", "Location not found! Please enter a valid location.");
    return res.redirect("/listings/new");
  }

  if (!req.file) {
  req.flash("error", "Image upload failed!");
  return res.redirect("/listings/new");
}

let url = req.file.path;
let filename = req.file.filename;
 

const lon = parseFloat(geoData[0].lon);
const lat = parseFloat(geoData[0].lat);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = {
    type: "Point",
    coordinates:[lon,lat] ,
  };
  newListing.category = req.body.listing.category;

  await newListing.save();
  req.flash("success", " New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  const geoResponse = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${req.body.listing.location},${req.body.listing.country}&format=json`,
    { headers: { "User-Agent": "WanderlustApp/1.0" } },
  );
  const geoData = await geoResponse.json();

  if (!geoData || geoData.length === 0) {
  req.flash("error", "Invalid location!");
  return res.redirect(`/listings/${id}/edit`);
}

const lon = parseFloat(geoData[0].lon);
const lat = parseFloat(geoData[0].lat);

  listing.geometry = {
    type: "Point",
    coordinates: [lon,lat],
  };
  listing.category = req.body.listing.category;

  await listing.save();

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", " Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  await cloudinary.uploader.destroy(deletedListing.image.filename);

  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
};
