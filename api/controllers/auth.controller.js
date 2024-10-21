const userModel=require('../models/user.model');
const bcryptjs=require('bcryptjs');
const errorUtils=require('../utils/error');

module.exports.signup=async (req,res,next)=>{
    const {username, email, password}=req.body;
    const hashedPass=bcryptjs.hashSync(password,10);
    const newUser=new userModel({username,email,password: hashedPass});
    try
    {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch(error){
        next(error);
    }
}