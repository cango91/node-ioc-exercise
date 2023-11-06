import { Router } from "express";
import { Container } from "inversify";
import { UserController } from "../../application/interfaces/controllers/UserController";


export default function registerRoutes(container:Container){
    const router = Router();
    const userController = container.resolve(UserController);

    router.post('/users', (req,res) => userController.createUser(req,res));
    router.post('/users/login', (req,res) => userController.login(req,res));

    return router;
}