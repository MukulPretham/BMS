import express from "express";
let router = express.Router();
import { Bus } from "../models/Bus.js";

router.post("/",async(req,res)=>{
    let currBus = new Bus({
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        fare: req.body.fare,
        duration: req.body.duration,
        Total_Seats: req.body.totalSeats,
        Available_Seats: req.body.availableSeats
    })
    currBus.save();
    console.log("bus Saved");
    res.redirect("/admin.html");
})

export default router