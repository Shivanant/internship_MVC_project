import { request } from "express";
import mongoose from "mongoose";
import Author from "./author.js";
import path from "path"

const coverImageBasePath='uploads/bookCovers'
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    descreption:{
        type:String,
        required:true
    },
    publishDate:{
        type:Date
    },
    pageCount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    }


})

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName!=null){
        return path.join('/',coverImageBasePath,this.coverImageName)
    }

})

const Book= mongoose.model("Book",bookSchema)
Book.coverImageBasePath=coverImageBasePath
export default Book;