const userModel=require('../models/user.model');
const bcryptjs=require('bcryptjs');
const {errorHandler}=require('../utils/error');
const jwt = require('jsonwebtoken');

module.exports.signup=async (req,res,next)=>{
    const {username, email, password}=req.body;
    try
    {
        const hashedPass=bcryptjs.hashSync(password,10);
        const newUser=new userModel({username,email,password: hashedPass});
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch(error){
        next(error);
    }
}

module.exports.signin=async (req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await userModel.findOne({email});
        if(!validUser) return next(errorHandler(404,'User Not Found'));

        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong Credentials!'));

        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY);
        const {password: pass, ...rest}=validUser._doc;
        res
            .cookie('access_token',token,{ httpOnly: true,})
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}