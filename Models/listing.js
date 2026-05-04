const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./review.js")
const User = require("./user.js")


const listingSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
        url : {
            type : String
        },
        filename : {
            type : String
        }
    },
    price : {
        type : Number
    },
    location : {
        type :String
    },
    country : {
        type : String
    },
       category: {
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"],
        default: "Trending"
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    geometry : {
    type : {
        type : String,
        enum : ["Point"],  
    },
    coordinates : {
        type : [Number],   
    },
}
})


listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing.reviews.length){
    await Review.deleteMany({_id : {$in : listing.reviews}})
    }
})

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing;