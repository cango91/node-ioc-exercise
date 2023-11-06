import { inject, injectable } from "inversify";
import IUserRepository from "../interfaces/repositories/UserRepository";
import ICryptoService from "../services/CryptoService";
import UserLoginResult from "../dto/UserLoginResult";
import { TYPES } from "../../types";

@injectable()
export default class LoginUser {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ICryptoService) private cryptoService: ICryptoService
    ) { }

    async execute(username: string, password: string) {
        const user = await this.userRepository.findUserByUsername(username);
        if (!user) throw new Error("Invalid credentials");
        return new UserLoginResult(
            user,
            await this.cryptoService.compare(password, user.password)
        );
    }
}