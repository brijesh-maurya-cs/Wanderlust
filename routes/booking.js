const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams zaroori hai ID lene ke liye
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const Booking = require("../Models/booking.js");
const Listing = require("../Models/listing.js");


// Render Booking Form
router.get("/book", isLoggedIn, async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/book.ejs", { listing });
});



router.post("/", isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let { checkIn, checkOut } = req.body.booking;

        const newBooking = new Booking({
            listing: id,
            user: req.user._id,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut)
        });

        await newBooking.save();

        req.flash("success", "Congratulations! Your stay is booked.");
        res.redirect(`/listings/${id}`);
    } catch (e) {
        req.flash("error", "Booking failed! Please try again.");
        res.redirect(`/listings/${id}`);
    }
});

module.exports = router;