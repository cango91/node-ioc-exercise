import { User } from "../../domain/entities/User";

export default interface ITokenService {
    generateToken(user: {id: string, username: string}): string;
    verifyToken(token: string): {id: string, username: string} | null;
}