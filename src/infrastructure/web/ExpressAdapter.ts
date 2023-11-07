import { inject } from "inversify";
import { TYPES } from "../../types";
import IUserController from "../../application/interfaces/controllers/IUserController";
import { NextFunction, Request, Response } from "express";
import CreateUserDTO from "../../application/dto/CreateUser";
import LoginDTO from "../../application/dto/Login";
import IRequestUser from "../../application/interfaces/controllers/IRequestUser";
import CreateTaskDTO from "../../application/dto/CreateTask";
import ITaskController from "../../application/interfaces/controllers/ITaskController";
import UpdateTaskDTO from "../../application/dto/UpdateTask";

export default class ExpressAdapter {
    constructor(
        @inject(TYPES.IUserController) private userController: IUserController,
        @inject(TYPES.ITaskController) private taskController: ITaskController
    ) { }

    public createUser(req: Request, res: Response, next: NextFunction) {
        const createUserDTO: CreateUserDTO = {
            username: req.body.username,
            password: req.body.password
        };

        this.userController.createUser(createUserDTO)
            .then(userResponse => res.status(201).json(userResponse))
            .catch(next);
    }

    public login(req: Request, res: Response, next: NextFunction): void {
        const loginDTO: LoginDTO = {
            username: req.body.username,
            password: req.body.password
        };

        this.userController.login(loginDTO)
            .then(tokenResponse => res.status(200).json(tokenResponse))
            .catch(next);
    }

    public createTask(req: Request & IRequestUser, res: Response, next: NextFunction) {
        const createTaskDTO: CreateTaskDTO = {
            title: req.body.title,
            description: req.body.description,
        };
        this.taskController.create(createTaskDTO, req.user?.id!)
            .then(taskDto => res.status(200).json(taskDto))
            .catch(next);
    }

    public updateTask(req: Request & IRequestUser, res: Response, next: NextFunction) {
        const updateTaskDTO: UpdateTaskDTO = {
            title: req.body.title,
            description: req.body.description
        };
        this.taskController.update(req.params.id, updateTaskDTO, req.user?.id!)
            .then(taskDto => res.status(200).json(taskDto))
            .catch(next);
    }

    public deleteTask(req: Request & IRequestUser, res: Response, next: NextFunction) {
        this.taskController.delete(req.params.id, req.user?.id!)
            .then(() => res.status(200).json({}))
            .catch(next);
    }

    public listTasks(req: Request & IRequestUser, res: Response, next: NextFunction) {
        this.taskController.list(req.user?.id!)
            .then(tasksDto => res.status(200).json(tasksDto))
            .catch(next);
    }

}