import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, ShareLinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { UserMiddleware } from "./UserMiddleware";
import { random } from "./utils";

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

app.post("/api/v1/signin", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const checkUser = await UserModel.findOne({
        username: username,
        password: password
    });

    if(checkUser) {
        const jwtData = jwt.sign({
            id: checkUser.id
        },JWT_PASSWORD)

        res.json({
            jwt: jwtData
        });
    } else {
        res.status(403).json({
            message: "Invail username and password"
        })
    }

})

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
    console.log(req.body);
    
    const title = req.body.title;
    const link = req.body.link;
    // const tags = req.body.tag;
    await ContentModel.create({
        title: title,
        link: link,
        tag: '',
        //@ts-ignore 
        userId: req.userId
    })
    res.json({
        message: "Content added"
    })

})

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
    const userContent = await ContentModel.find({
        //@ts-ignore
        userId: req.userId
    }).populate("userId", "username")
    res.json({
        userContent
    })
})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
    const share = req.body.share;

    if(share) { 
        const shareLink = await ShareLinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })
        if(shareLink) {
            res.json({
                hash: shareLink.hash
            })
            return;     
        }
        const hash = random(10);
        await ShareLinkModel.create({
            hash: hash,
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            hash: hash
        })
    } else {
        await ShareLinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            measge: "Remove share link"
        })
    }


})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const shareLink = await ShareLinkModel.findOne({
        hash: hash
    })
    if(shareLink) {
        const user = await UserModel.findOne({
            _id: shareLink.userId
        })
        const userContent = await ContentModel.find({
            userId: shareLink.userId
        })
        if(!user){
            res.json({
                message: "user Not found"
            })
            return;
        }
        res.json({
            user: user.username,
            content: userContent
        })
    } else {
        res.json({
            message: "not vaild code"
        })
    }
})

app.listen(3000);
