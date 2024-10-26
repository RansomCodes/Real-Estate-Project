const { errorHandler } = require("../utils/error")
const Listing =require("../models/listing.model")

module.exports.createListing=async (req,res,next)=>{
    try {
        const newListing=new Listing(req.body);
        await newListing.save();
        return res.status(201).json(newListing);
    } catch (error) {
        next(errorHandler(error));
    }
}