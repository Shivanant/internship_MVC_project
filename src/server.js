import express from "express"
import "./db/connection.js"
import "dotenv/config"


// routes //
import indexRouter from "./routes/index.js"

const port= process.env.PORT || 3000
const app=express()

app.use('/',indexRouter)

app.listen(port,()=>{
    console.log(`Server running at port :${port}`)
})