import express from "express";
import { Bus } from "../models/Bus.js";
let router = express.Router();

router.get("/", async (req, res) => {
    let DATE = new Date(req.query.date);
    let busInfo = await Bus.find({ fromAddress: req.query.from, date: DATE, toAddress: req.query.to });
    res.json(busInfo);
})

router.get("/:_id", async (req, res) => {
    let busInfo = await Bus.findOne({ _id: req.params._id });
    res.json(busInfo);
})

router.get("/bookings/:_id", async (req, res) => {
    let details = await Bus.findOne({ _id: req.params._id });
    res.json(details);
})

router.post("/bookSeat/:_id", async (req, res) => {
    try {
        let newArr = req.body.seatLayout;
        let availableSeats = 0;
        for (let i = 0; i < 40; i++) {
            if (newArr[i] == true) {
                availableSeats++;
            }
        }
        try {
            await Bus.updateOne({ _id: req.params._id }, { $set: { Available_Seats: availableSeats } })
            await Bus.updateOne({ _id: req.params._id }, { $set: { seatLayout: newArr } });

            //updating th booking logs of a bus.
            const PNR = Math.floor(100000 + Math.random() * 999999)
            let customerDetails = [];
            customerDetails.push(req.body.username);
            customerDetails.push(req.body.seats);
            customerDetails.push(PNR);

            const bookingBus = await Bus.updateOne({ _id: req.params._id }, { $push: { customers: customerDetails } });
            console.log(bookingBus);
            res.status(200).json({ message: "sucesss", PNR: PNR });
        }catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error, Pleasr try agian later"});
            return;
        }
        
    } catch (error) {
        res.json("failed");
    }
})

export default router;