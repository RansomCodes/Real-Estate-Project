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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fblank-profile&psig=AOvVaw0U0G11IjPgxLg-GjY7Ht13&ust=1729682039310000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCZk-7toYkDFQAAAAAdAAAAABAE",
    },
},{timestamps: true})

const User=mongoose.model('User',userSchema);

module.exports=User;