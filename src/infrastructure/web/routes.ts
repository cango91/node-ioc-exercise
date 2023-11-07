import { Request, Router } from "express";
import { Container } from "inversify";
import { UserController } from "../../application/interfaces/controllers/UserController";
import requireLoginMiddleware from "./middleware/requireLogin";
import { TaskController } from "../../application/interfaces/controllers/TaskController";
import IRequestUser from "../../application/interfaces/controllers/IRequestUser";
import ExpressAdapter from "./ExpressAdapter";


export default function registerRoutes(container: Container) {
    const router = Router();
    const userController = container.resolve(UserController);
    const taskController = container.resolve(TaskController);
    const expressAdapter = new ExpressAdapter(userController, taskController);

    router.post('/api/users', expressAdapter.createUser.bind(expressAdapter));
    router.post('/api/users/login', expressAdapter.login.bind(expressAdapter));

    router.post('/api/tasks', requireLoginMiddleware, expressAdapter.createTask.bind(expressAdapter));
    router.put('/api/tasks/:id', requireLoginMiddleware, expressAdapter.updateTask.bind(expressAdapter));
    router.delete('/api/tasks/:id', requireLoginMiddleware, expressAdapter.deleteTask.bind(expressAdapter));
    router.get('/api/tasks', requireLoginMiddleware, expressAdapter.listTasks.bind(expressAdapter));

    return router;
}