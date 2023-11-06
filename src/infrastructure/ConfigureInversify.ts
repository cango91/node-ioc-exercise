import { Container } from "inversify";
import "reflect-metadata";
import ICryptoService from "../application/services/ICryptoService";
import CryptoService from "./services/CryptoService";
import { TYPES } from "../types";
import RegisterUser from "../application/use_cases/RegisterUser";
import LoginUser from "../application/use_cases/LoginUser";
import { UserController } from "../application/interfaces/controllers/UserController";
import IUserRepository from "../application/interfaces/repositories/IUserRepository";
import { MongoUserRepository } from "./repositories/mongo/MongoUserRepository";
import IDbConnection from "../application/services/IDbConnection";
import MongooseConnectionHandler from "./repositories/mongo/MongooseConnectionHandler";
import ITokenService from "../application/services/ITokenService";
import TokenService from "./services/TokenService";


const container = new Container();
container.bind<ICryptoService>(TYPES.ICryptoService).to(CryptoService);
container.bind<RegisterUser>(TYPES.RegisterUser).to(RegisterUser);
container.bind<LoginUser>(TYPES.LoginUser).to(LoginUser);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserRepository>(TYPES.IUserRepository).to(MongoUserRepository);
container.bind<IDbConnection>(TYPES.IDbConnection).to(MongooseConnectionHandler);
container.bind<ITokenService>(TYPES.ITokenService).to(TokenService);

export { container };