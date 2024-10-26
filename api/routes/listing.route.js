const express=require('express');
const router=express.Router();

const { verifyToken }=require('../utils/verifyUser')
const { createListing } = require('../controllers/listing.controller');

router.post('/create',verifyToken,createListing);

module.exports=router;