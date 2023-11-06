import jwt, { JwtPayload } from 'jsonwebtoken';
import ITokenService from "../../application/services/ITokenService";

export default class TokenService implements ITokenService {
    generateToken(user: { id: string, username: string }) {
        return jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES });
    }

    verifyToken(token: string): { id: string; username: string; } | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            return { id: decoded.id, username: decoded.username };
        } catch (error: any) {
            return null;
        }
    }
}