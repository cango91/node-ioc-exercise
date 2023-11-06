import { injectable } from "inversify";
import IUserRepository from "../../../application/interfaces/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import UserModel from "./UserSchema";

@injectable()
export class MongoUserRepository implements IUserRepository {
    async createUser(username: string, password: string): Promise<User | null> {
        try {
            const user = await UserModel.create({ username, password });
            return { id: user._id.toString(), username: user.username, password: user.password };
        } catch (error: any) {
            console.error(error);
            return null;
        }
    };

    findUserById(id: string): Promise<User | null> {
        return new Promise(res => null);
    };

    async findUserByUsername(username: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ username: username.toLowerCase() });
            if (!user) return null;
            return { id: user?._id.toString(), password: user?.password, username: user?.username };
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    updatePassword(id: string, oldPassword: string, newPassword: string): Promise<boolean> {
        return new Promise(res => false);
    };
    deleteUser(id: string): Promise<boolean> {
        return new Promise(res => false);
    };
}