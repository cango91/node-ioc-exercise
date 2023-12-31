import { inject, injectable } from "inversify";
import IUserRepository from "../interfaces/repositories/IUserRepository";
import ICryptoService from "../services/ICryptoService";
import { TYPES } from "../../types";

@injectable()
export default class RegisterUser {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.ICryptoService) private cryptoService: ICryptoService
    ) { }

    async execute(username: string, password: string) {
        if (await this.userRepository.findUserByUsername(username)) {
            throw new Error('Username is already taken');
        }
        password = await this.cryptoService.hash(password);
        const createdUser = await this.userRepository.createUser(username, password);
        if (!createdUser) throw new Error('User could not be created');
        return { id: createdUser.id, username: createdUser.username };
    }

}