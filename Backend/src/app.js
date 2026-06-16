require("dotenv").config()
const express = require('express');
const authRouter=require("./routes/auth.route")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const interviewRouter=require("./routes/interview.routes")

const app = express();


app.use(express.json());
app.use(cookieParser())
const allowedOrigins = [
    "https://res-ai-kappa.vercel.app",
    "https://res-3vf0gcyv9-ayushrajsingh0542s-projects.vercel.app"
];

app.set("trust proxy", 1);

app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials:true
}));

// using all the routes here
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)



module.exports=app;
