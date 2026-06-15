require("dotenv").config()
const express = require('express');
const authRouter=require("./routes/auth.route")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const interviewRouter=require("./routes/interview.routes")

const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({ 
    origin:process.env.FRONTEND_URL,
    credentials:true
})) 

// using all the routes here
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)



module.exports=app;
