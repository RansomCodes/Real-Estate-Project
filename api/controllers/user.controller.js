const { errorHandler } = require("../utils/error");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/user.model");

module.exports.test = (req, res) => {
  res.send("5000");
};

module.exports.updateUser = async (req, res,next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "You can only update your own Account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser= async (req,res,next)=>{
  if(req.user.id != req.params.id){
    return next(errorHandler(401,"You can only delete your own account"));
  } 
  try {
    const response=await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json("Successfully deleted the User");
  } catch (error) {
    return next(error);
  }
}
