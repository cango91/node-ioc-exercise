import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import LoginUser from "../../use_cases/LoginUser";
import RegisterUser from "../../use_cases/RegisterUser";
import ITokenService from "../../services/ITokenService";


@injectable()
export class UserController {
    constructor(
        @inject("LoginUser") private loginUser: LoginUser,
        @inject("RegisterUser") private registerUser: RegisterUser,
        @inject("ITokenService") private tokenService: ITokenService
    ) { };

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user = await this.registerUser.execute(username, password);
            // generate token
            const token = this.tokenService.generateToken(user);
            res.status(201).json({ user, token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const response = await this.loginUser.execute(username, password);
            if (!response.isValid) throw new Error("Invalid Credentials");
            // generate token
            const token = this.tokenService.generateToken(response.user);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}