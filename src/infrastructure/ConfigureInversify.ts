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
import CreateTask from "../application/use_cases/CreateTask";
import DeleteTask from "../application/use_cases/DeleteTask";
import UpdateTask from "../application/use_cases/UpdateTask";
import ListTasks from "../application/use_cases/ListTasks";
import ITaskRepository from "../application/interfaces/repositories/ITaskRepository";
import MongoTaskRepository from "./repositories/mongo/MongoTaskRepository";
import IUserController from "../application/interfaces/controllers/IUserController";
import ITaskController from "../application/interfaces/controllers/ITaskController";
import { TaskController } from "../application/interfaces/controllers/TaskController";


const container = new Container();
container.bind<ICryptoService>(TYPES.ICryptoService).to(CryptoService);
container.bind<RegisterUser>(TYPES.RegisterUser).to(RegisterUser);
container.bind<LoginUser>(TYPES.LoginUser).to(LoginUser);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IUserRepository>(TYPES.IUserRepository).to(MongoUserRepository);
container.bind<IDbConnection>(TYPES.IDbConnection).to(MongooseConnectionHandler);
container.bind<ITokenService>(TYPES.ITokenService).to(TokenService);
container.bind<CreateTask>(TYPES.CreateTask).to(CreateTask);
container.bind<DeleteTask>(TYPES.DeleteTask).to(DeleteTask);
container.bind<UpdateTask>(TYPES.UpdateTask).to(UpdateTask);
container.bind<ListTasks>(TYPES.ListTasks).to(ListTasks);
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(MongoTaskRepository);
container.bind<IUserController>(TYPES.IUserController).to(UserController);
container.bind<ITaskController>(TYPES.ITaskController).to(TaskController);


export { container };