import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { User } from "./models/User.js";
import admin from "./routes/admin.js"

let app = express();

//Middle-Wares
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

//Connecting to mongoose
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase connected")
})

app.use("/add-route",admin);

//SignUp route
app.get("/SignUp",(req,res)=>{
    res.sendFile(path.resolve("views/SignUp.html"))
})
app.use("/signup",async(req,res)=>{
    let currUsername = req.body.username;
    if(await User.findOne({username: currUsername})){
        return res.send("already exits");
    }
    if(await User.findOne({Email: req.body.email})){
        return res.send("email already exits");
    }
    let user = new User({
        username: req.body.username,
        Email: req.body.email,
        password: req.body.password
    })
    await user.save();
    console.log("user saved");
    res.redirect("/");
})

//LogIn route
app.get("/LogIn",(req,res)=>{
    res.sendFile(path.resolve("views/LogIn.html"))
})
app.post("/login",async (req,res)=>{
    if(req.body.username=="Mukul"){
        if(req.body.password=="MukuL123$$$"){
            return res.redirect("admin.html");
        }
    }
    let currUser = await User.findOne({username: req.body.username});
    if(req.body.password == currUser.password){
        return res.redirect(path.resolve("/main.html"));
    }
    res.send("Incorrect password or username");
})


app.listen(dotenv.PORT || 3000,()=>{
    console.log("server started");
})