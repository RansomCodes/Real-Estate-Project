const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user.controller');

router.get('/test',userControllers.test);

module.exports=router;