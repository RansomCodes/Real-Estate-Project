const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const app=express();

const userRoutes=require('./routes/user.routes');
const authRoutes=require('./routes/auth.route');

app.use(express.json());

mongoose.connect(process.env.mongo)
    .then(()=>{
    console.log("CONNECTED TO DB");
    }).catch((error)=>{
        console.log("UNABLE TO CONNECT TO DB");
    })

app.listen(3000,()=>{
    console.log("SERVER IS RUNNING ON PORT 3000");
})

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);