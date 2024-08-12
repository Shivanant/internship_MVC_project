import Author from "../models/author.js";
import Book from "../models/book.js";
import express, { query } from "express"
import multer from "multer"
import path from 'path';
import fs from "fs";


const uploadPath=path.join('public',Book.coverImageBasePath)
const imageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff',
    'image/x-icon'  // For ICO files
  ];
const upload= multer({
    dest:uploadPath,
    fileFilter:(req,file,callback)=>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})

const router =express.Router();

router.get('/',async(req,res)=>{
    

    try{
        let searchoptions={}
        searchoptions.title= new RegExp(req.query.title,'i')
        let books=await Book.find(searchoptions)
        res.render("books/index",{
            searchoptions:req.query.title,
            books
        })

    }catch(e){
        console.log("This is error message")
        res.render('books')
    }
    
    
})

router.get('/new',async(req,res)=>{
    try{
        const authors = await Author.find({})
    const book= new Book();
    res.render('books/new',{
        authors,
        book
    })
    console.log(book)
    }catch(e){
        res.render('boosks/index')
    }
})
function removebookcover(file){
    fs.unlink(path.join(uploadPath,file),err=>{
        if (err)console.log(err)
    })
}

router.post('/',upload.single('cover'),async(req,res)=>{
    const fileName=req.file!=null?req.file.filename:null
    const book = new Book({
        title:req.body.title,
        descreption:req.body.descreption,
        publishDate: new Date(req.body.publishDate),
        author:req.body.author,
        coverImageName:fileName,
        pageCount:req.body.pageCount
    })
    try{
        const newBook=await book.save()
        res.redirect('books')
    }catch (e){
        if (book.coverImageName!=null){
            removebookcover(book.coverImageName)
        }
        console.log("The error in creating the book :",e)

    }

})
export default router;