import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import LoginUser from "../../use_cases/LoginUser";
import RegisterUser from "../../use_cases/RegisterUser";


@injectable()
export class UserController{
    constructor(
        @inject("LoginUser") private loginUser: LoginUser,
        @inject("RegisterUser") private registerUser: RegisterUser
    ){};

    public async createUser(req:Request, res:Response) : Promise<void> {
        
    }
}