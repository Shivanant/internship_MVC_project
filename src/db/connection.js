import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to mongodb data")
}).catch((e)=>{
    console.log("The error in connecting to DBS is :",e);
})