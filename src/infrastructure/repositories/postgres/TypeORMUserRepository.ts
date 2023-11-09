import { DataSource, Repository } from "typeorm";
import User from "./entities/UserEntity";
import IUserRepository from "../../../application/interfaces/repositories/IUserRepository";
import { inject, injectable } from "inversify";
import IDbConnection from "../../../application/services/IDbConnection";
import { TYPES } from "../../../types";

@injectable()
export default class TypeORMUserRepository implements IUserRepository {
    private userRepository!: Repository<User>;
    constructor(
        @inject(TYPES.IDbConnection) dbConnection: IDbConnection
    ) {
        dbConnection.connect(process.env.DB_URL!).then(ds => this.userRepository = ds.getRepository(User)).catch(console.error);
    }
    async createUser(username: string, password: string) {
        try {

            const user = this.userRepository.create({ username, password });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async findUserById(id: string) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async findUserByUsername(username: string) {
        try {
            const user = await this.userRepository.findOneBy({username});
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async updatePassword(){
        return false;
    }
    async deleteUser(){
        return false;
    }


}