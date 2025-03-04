import mongoose from "mongoose";

let busSchema = new mongoose.Schema({
    fromAddress: String,
    toAddress: String,
    fare: Number,
    date: Date,
    duration: Number,
    Total_Seats: Number,
    Available_Seats: Number
})

export let Bus = mongoose.model("Buses",busSchema);