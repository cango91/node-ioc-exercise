import { NextFunction, Request, Response } from "express";
import IRequestUser from "../../../application/interfaces/controllers/IRequestUser";
import ITokenService from "../../../application/services/ITokenService";

export default function bearerMiddlewareFactory(tokenService: ITokenService){
    return async function bearerMiddleware(req:Request & IRequestUser, res:Response, next: NextFunction){
        req.user = null;
        try {
            let token = req.headers.authorization;
            if(token){
                token = token.split(" ")[1];
                const user = tokenService.verifyToken(token);
                req.user = user;
            }
        } catch (error:any) {
        }
        next();
    }
}