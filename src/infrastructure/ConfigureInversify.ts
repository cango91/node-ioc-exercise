import { Container } from "inversify";
import "reflect-metadata";
import ICryptoService from "../application/services/CryptoService";
import CryptoService from "./services/CryptoService";
import { TYPES } from "../types";
import RegisterUser from "../application/use_cases/RegisterUser";
import LoginUser from "../application/use_cases/LoginUser";


const container = new Container();
container.bind<ICryptoService>(TYPES.ICryptoService).to(CryptoService);
container.bind<RegisterUser>(TYPES.RegisterUser).to(RegisterUser);
container.bind<LoginUser>(TYPES.LoginUser).to(LoginUser);

export { container };