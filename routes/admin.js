import express from "express";
let router = express.Router();
import { Bus } from "../models/Bus.js";

router.post("/", async (req, res) => {
    let currDate = req.body.travelDate;
    console.log(currDate)
    let seats = parseInt(req.body.totalSeats);
    let seatLayout = [];
    for (let i = 0 ; i < seats ; i++ ){
        seatLayout[i] = true;
    }
    let currBus = new Bus({
        fromAddress: req.body.fromAddress,
        toAddress: req.body.toAddress,
        fare: req.body.fare,
        date: new Date(currDate),
        time: req.body.travelTime,
        duration: req.body.duration,
        Total_Seats: req.body.totalSeats,
        Available_Seats: req.body.availableSeats,
        seatLayout: seatLayout
    })
    currBus.save();
    console.log("bus Saved");
    res.redirect("/admin.html");
})

export default router