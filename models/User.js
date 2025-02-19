import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: String,
    Email: String,
    password: String
})

export let User = mongoose.model("Users",userSchema);

