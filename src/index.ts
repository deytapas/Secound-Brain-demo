import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {

    const userName = req.body.username;
    const password = req.body.password;
    try {
        const userData = await UserModel.create({
            username: userName,
            password: password
        })

        res.json({
            message : "User Created Successfully"
        })

    } catch(e) {
        res.status(411).json({
            message: "User already exsits"
        })
    }
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})


app.get("/api/v1/brain/shareLink", (req, res) => {

})

app.listen(3000);
