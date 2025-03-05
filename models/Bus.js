import mongoose from "mongoose";

let busSchema = new mongoose.Schema({
    fromAddress: String,
    toAddress: String,
    fare: Number,
    time : String,
    date: Date,
    duration: Number,
    Total_Seats: Number,
    Available_Seats: Number,
    seatLayout: [Boolean]
})

export let Bus = mongoose.model("Buses",busSchema);