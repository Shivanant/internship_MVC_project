import express from "express"
import Book from "../models/book.js"

const router =express.Router()

router.get('/',async(req,res)=>{
    let books
    try{
        books=await Book.find().sort({createdAt:"desc"})
        

    }catch(e){
        console.log("Error is :",e)
    }
    res.render("index",{books})

})

export default router;

