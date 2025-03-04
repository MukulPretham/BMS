import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { User } from "./models/User.js";
import admin from "./routes/admin.js"
import buses from "./routes/buses.js"
import session from "express-session";

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
app.use("/buses",buses);

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
app.post("/login", async (req, res) => {
    if (req.body.username === "Mukul" && req.body.password === "MukuL123$$$") {
        return res.sendFile(path.resolve("./views/admin.html"));
    }

    let currUser = await User.findOne({ username: req.body.username });
    if (!currUser) {
        return res.send("User not found");
    }

    if (req.body.password === currUser.password) {
        req.session.user = { username: currUser.username, role: "user" };  // Store session
        return res.redirect("/main");
    }

    res.send("Incorrect password or username");
});

// Protected Route Example (Dashboard)
app.get("/main", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/LogIn");
    }
    res.redirect("/main.html");
});

// Admin Page Route
app.get("/admin", (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).send("Access Denied");
    }
    res.sendFile(path.resolve("/admin.html"));
});

// Logout Route
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

//booking route.
app.get("/booking", (req, res) => {
    console.log("Entered booking section");
    res.sendFile(path.resolve("views", "booking.html"));
});

app.listen(dotenv.PORT || 3000,()=>{
    console.log("server started");
})