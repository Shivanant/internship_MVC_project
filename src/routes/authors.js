import Author from "../models/author.js";
import express from "express"

const router =express.Router();

router.get('/',async(req,res)=>{
    try{
    let searchoptions={}
    searchoptions.name= new RegExp(req.query.name,'i')
    let authors=await Author.find(searchoptions)
    res.render('authors/index',{searchoptions:req.query.name,authors})
    }catch(e){
        res.redirect('/authors/index',{
            errorMessage:e
        })

    }
})

router.get('/new',(req,res)=>{
    res.render('authors/new')
})

router.post('/',async(req,res)=>{
    const author= new Author({
        name:req.body.name
    })
    try{
        await author.save();
        res.render("authors",{authors:[]})
    }catch(e){
        res.render('authors/new',{
            errorMessage:e
        })
    }
})
export default router;