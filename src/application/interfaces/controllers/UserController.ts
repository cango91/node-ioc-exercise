import { inject, injectable } from "inversify";
import LoginUser from "../../use_cases/LoginUser";
import RegisterUser from "../../use_cases/RegisterUser";
import ITokenService from "../../services/ITokenService";
import { TYPES } from "../../../types";
import IUserController from "./IUserController";
import CreateUserDTO from "../../dto/CreateUser";
import UserResponseDTO from "../../dto/UserResponse";
import LoginDTO from "../../dto/Login";
import TokenResponseDTO from "../../dto/TokenResponse";


@injectable()
export class UserController implements IUserController {
    constructor(
        @inject(TYPES.LoginUser) private loginUser: LoginUser,
        @inject(TYPES.RegisterUser) private registerUser: RegisterUser,
        @inject(TYPES.ITokenService) private tokenService: ITokenService
    ) { };

    public async createUser(userData: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.registerUser.execute(userData.username, userData.password);
        const token = this.tokenService.generateToken({ id: user.id, username: user.username });
        return { user, token };
    }

    public async login(credentials: LoginDTO): Promise<TokenResponseDTO> {
        const response = await this.loginUser.execute(credentials.username, credentials.password);
        if (!response.isValid) throw new Error("Invalid Credentials");
        const token = this.tokenService.generateToken({ id: response.user.id, username: response.user.username });
        return { token };
    }
}