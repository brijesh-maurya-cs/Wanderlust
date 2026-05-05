const Listing = require("../Models/listing");
const { cloudinary } = require("../cloudConfig.js");

const getCoordinates = async (location, country) => {
  try {
    const cleanLocation = location.trim().toLowerCase();
    const cleanCountry = country.trim().toLowerCase();

    let query = encodeURIComponent(`${cleanLocation}, ${cleanCountry}`);

    let res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: { "User-Agent": "WanderlustApp/1.0" },
      }
    );

    let data = await res.json();

    if (!data || data.length === 0) {
      res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${cleanLocation}&format=json&limit=1`,
        {
          headers: { "User-Agent": "WanderlustApp/1.0" },
        }
      );
      data = await res.json();
    }

    if (data && data.length > 0) {
      return [
        parseFloat(data[0].lon),
        parseFloat(data[0].lat),
      ];
    }

    return null;
  } catch (err) {
    console.log("Geo error:", err);
    return null;
  }
};

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

module.exports.createListing = async (req, res) => {
  try {
    const coords = await getCoordinates(
      req.body.listing.location,
      req.body.listing.country
    );

    if (!req.file) {
      req.flash("error", "Image upload failed!");
      return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    if (coords) {
      newListing.geometry = {
        type: "Point",
        coordinates: coords,
      };
    } else {
      newListing.geometry = {
        type: "Point",
        coordinates: [78.9629, 20.5937], 
    };
    }

    newListing.category = req.body.listing.category;

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

  } catch (err) {
    console.log("CREATE ERROR:", err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
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
  try {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    Object.assign(listing, req.body.listing);

    const coords = await getCoordinates(
      req.body.listing.location,
      req.body.listing.country
    );

    if (coords) {
      listing.geometry = {
        type: "Point",
        coordinates: coords,
      };
    }else {
      newListing.geometry = {
        type: "Point",
        coordinates: [78.9629, 20.5937], 
    };
    }

    listing.category = req.body.listing.category;

    if (typeof req.file !== "undefined") {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  await cloudinary.uploader.destroy(deletedListing.image.filename);

  req.flash("success", " Listing Deleted!");
  res.redirect("/listings");
};