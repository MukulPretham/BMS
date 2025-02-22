import express from "express";
import { Bus } from "../models/Bus.js";
let router = express.Router();

router.get("/",async(req,res)=>{
    let busInfo = await Bus.find({fromAddress: req.query.from , toAddress: req.query.to});
    res.json(busInfo);
})

export default router;