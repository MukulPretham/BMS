import express from "express";
import { Bus } from "../models/Bus.js";
let router = express.Router();

router.get("/",async(req,res)=>{
    let busInfo = await Bus.find({fromAddress: req.query.from , toAddress: req.query.to});
    res.json(busInfo);
})

router.get("/bookings/:_id",async(req,res)=>{
    let details = await Bus.findOne({_id: req.params._id});
    res.json(details);
})

export default router;