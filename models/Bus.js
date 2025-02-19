import mongoose from "mongoose";

let busSchema = new mongoose.Schema({
    fromAddress: String,
    toAddress: String,
    fare: Number,
    duration: Number
})

export let Bus = mongoose.model("Buses",busSchema);