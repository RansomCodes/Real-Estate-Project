const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const app=express();

mongoose.connect(process.env.mongo)
    .then(()=>{
    console.log("CONNECTED TO DB");
    }).catch((error)=>{
        console.log("UNABLE TO CONNECT TO DB");
    })

app.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
})

//DD2J3fCy7b974Azc