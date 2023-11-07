import { NextFunction, Request, Response } from "express";
import IRequestUser from "../../../application/interfaces/controllers/IRequestUser";

export default function requireLoginMiddleware(req: Request & IRequestUser, res: Response, next: NextFunction) {
    if (req.user) return next();
    res.status(401).json({ error: "Must be logged in to access this route" });
}