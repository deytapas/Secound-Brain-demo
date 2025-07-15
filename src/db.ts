import mongoose, { Schema, model } from "mongoose";
mongoose.connect("mongodb+srv://deytapas374:syLPAYRsmQAJuobh@cluster0.j1yom9v.mongodb.net/SecondBrain");

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
})

export const UserModel = model("User", UserSchema);