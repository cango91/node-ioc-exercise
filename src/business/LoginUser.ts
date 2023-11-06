import { inject, injectable } from "inversify";
import IUserRepository from "../interfaces/gateway/UserRepository";
import ICryptoService from "./services/CryptoService";

@injectable()
export default class LoginUser{
    constructor(
        @inject(Symbol.for('IUserRepository')) private userRepository: IUserRepository,
        @inject(Symbol.for('ICryptoService')) private cryptoService: ICryptoService
    ){}
}