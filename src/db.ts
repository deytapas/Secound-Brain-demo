import mongoose, { Schema, model } from "mongoose";
import { DB_URL } from "./env";
mongoose.connect(DB_URL);

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tag: String,
    userId: {type:mongoose.Types.ObjectId, ref: "User", require: true}
})

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema)
