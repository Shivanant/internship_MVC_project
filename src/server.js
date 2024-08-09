import express from "express"
import "./db/connection.js"
import "dotenv/config"
import expressLayouts from "express-ejs-layouts"


// routes //
import indexRouter from "./routes/index.js"
import authorRoute from "./routes/authors.js"

const port= process.env.PORT || 3000
const app=express()


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({extended:true}))
app.use('/',indexRouter)
app.use('/authors',authorRoute)
app.use(express.static('public'))


app.listen(port,()=>{
    console.log(`Server running at port :${port}`)
})