import { User } from "../../domain/entities/User";

export default class UserLoginResult {
    constructor(
        public readonly user: User,
        public readonly isValid: boolean
    ) { }
}