const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-854.jpg?t=st=1729601677~exp=1729605277~hmac=7c44fbdaf3ebd9e7103c537760594ca8f10888532e1aa0a4bfaedadf3810c661&w=740",
    },
},{timestamps: true})

const User=mongoose.model('User',userSchema);

module.exports=User;