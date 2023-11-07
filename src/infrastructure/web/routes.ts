import { Request, Router } from "express";
import { Container } from "inversify";
import { UserController } from "../../application/interfaces/controllers/UserController";
import requireLoginMiddleware from "./middleware/requireLogin";
import { TaskController } from "../../application/interfaces/controllers/TaskController";
import IRequestUser from "../../application/interfaces/controllers/IRequestUser";


export default function registerRoutes(container: Container) {
    const router = Router();
    const userController = container.resolve(UserController);
    const taskController = container.resolve(TaskController);

    router.post('/users', (req, res) => userController.createUser(req, res));
    router.post('/users/login', (req, res) => userController.login(req, res));

    router.post('/tasks', requireLoginMiddleware, (req, res) => taskController.create(req, res));
    router.put('/tasks/:id', requireLoginMiddleware, (req, res) => taskController.update(req, res));
    router.delete('/tasks/:id', requireLoginMiddleware, (req, res) => taskController.delete(req, res));
    router.get('/tasks', requireLoginMiddleware, (req, res) => taskController.list(req, res));

    return router;
}