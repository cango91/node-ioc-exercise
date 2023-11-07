import jwt, { JwtPayload } from 'jsonwebtoken';
import ITokenService from "../../application/services/ITokenService";
import { injectable } from 'inversify';
@injectable()
export default class TokenService implements ITokenService {
    generateToken(user: { id: string, username: string }) {
        return jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES });
    }

    verifyToken(token: string): { id: string; username: string; } | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            return decoded.user;
        } catch (error: any) {
            return null;
        }
    }
}