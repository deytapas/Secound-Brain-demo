import { NextFunction, Request, Response } from "express";
import { JWT_PASSWORD } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken"; 

export const UserMiddleware =  (req: Request, res: Response, next: NextFunction) => {

    const jwtData = req.headers["authorization"];
    if (!jwtData) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    
    try {
        const userData = jwt.verify(jwtData as string, JWT_PASSWORD);
        // @ts-ignore
        req.userId = (userData as JwtPayload).id;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}