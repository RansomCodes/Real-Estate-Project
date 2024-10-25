const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user.controller');
const {verifyToken}=require('../utils/verifyUser')

router.get('/test',userControllers.test);
router.post('/update/:id',verifyToken,userControllers.updateUser)

module.exports=router;