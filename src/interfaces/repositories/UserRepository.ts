import { User } from "../../domain/entities/User";

export default interface IUserRepository {
    createUser: (username: string, password: string) => Promise<User | null>
    findUserById: (id: string) => Promise<User | null>
    findUserByUsername: (username: string) => Promise<User | null>
    updatePassword: (id: string, oldPassword: string, newPassword:string) => Promise<boolean>
    deleteUser: (id: string) => Promise<boolean>
}