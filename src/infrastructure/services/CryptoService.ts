import crypto from 'crypto';
import ICryptoService from "../../application/services/CryptoService";

export default class CryptoService implements ICryptoService {
    private HASH_ITER_ROUNDS = 16;
    private HASH_KEY_LENGTH = 64;
    private HASH_DIGEST = "sha512"

    public hash(payload: string) {
        const salt = crypto.randomBytes(Number(16)).toString('hex');
        return new Promise<string>((resolve, reject) =>
            crypto.pbkdf2(payload,
                salt,
                this.HASH_ITER_ROUNDS,
                this.HASH_KEY_LENGTH,
                this.HASH_DIGEST,
                (err, key) => {
                    if (err) {
                        reject(err.message);
                    }
                    resolve(`${salt}:${key.toString('hex')}`);
                }));
    }

    public compare(payload: string, hashed: string) {
        const [salt, key] = hashed.split(':');
        return new Promise<boolean>((resolve, reject) =>
            crypto.pbkdf2(payload,
                salt,
                Number(this.HASH_ITER_ROUNDS),
                Number(this.HASH_KEY_LENGTH),
                String(this.HASH_DIGEST),
                (err, compKey) => {
                    if (err) {
                        reject(false);
                    }
                    resolve(key === compKey.toString('hex'));
                }));
    }
}