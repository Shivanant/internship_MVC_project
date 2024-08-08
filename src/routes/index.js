import express from "express"
const router =express.Router()

router.get('/',(req,res)=>{
    console.log("This is indexjs router ")
    res.render("index.ejs")

})

export default router;

