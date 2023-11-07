import CreateUserDTO from "../../dto/CreateUser";
import LoginDTO from "../../dto/Login";
import TokenResponseDTO from "../../dto/TokenResponse";
import UserResponseDTO from "../../dto/UserResponse";

export default interface IUserController {
    createUser(userData: CreateUserDTO): Promise<UserResponseDTO>;
    login(credentials: LoginDTO): Promise<TokenResponseDTO>;
}