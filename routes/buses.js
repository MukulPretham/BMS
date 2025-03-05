import express from "express";
import { Bus } from "../models/Bus.js";
let router = express.Router();

router.get("/", async (req, res) => {
    let DATE = new Date(req.query.date);
    let busInfo = await Bus.find({ fromAddress: req.query.from, date: DATE, toAddress: req.query.to });
    res.json(busInfo);
})

router.get("/bookings/:_id", async (req, res) => {
    let details = await Bus.findOne({ _id: req.params._id });
    res.json(details);
})

router.post("/bookSeat/:_id", async (req, res) => {
    try {
        let newArr = req.body.seatLayout;
        await Bus.updateOne({ _id: req.params._id }, { $set: { seatLayout: newArr } })
        res.json("Done");
    } catch (error) {
        res.json("failed");
    }
})

export default router;