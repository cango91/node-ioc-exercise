import { inject, injectable } from "inversify";
import IUserRepository from "../interfaces/gateway/UserRepository";
import { User } from "../entities/User";

@injectable()
export default class RegisterUser{
    constructor(@inject(Symbol.for('IUserRepository')) private userRepository: IUserRepository){}

    async execute(user:User){
        if(await this.userRepository.findUserByUsername(user.username)){
            throw new Error('Username is already taken');
        }
        
    }

}