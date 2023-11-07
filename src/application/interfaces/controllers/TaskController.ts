import { inject, injectable } from "inversify";
import CreateTask from "../../use_cases/CreateTask";
import { TYPES } from "../../../types";
import { Request, Response } from "express";
import IRequestUser from "./IRequestUser";
import DeleteTask from "../../use_cases/DeleteTask";
import UpdateTask from "../../use_cases/UpdateTask";
import ListTasks from "../../use_cases/ListTasks";

@injectable()
export class TaskController {
    constructor(
        @inject(TYPES.CreateTask) private createTask: CreateTask,
        @inject(TYPES.DeleteTask) private deleteTask: DeleteTask,
        @inject(TYPES.UpdateTask) private updateTask: UpdateTask,
        @inject(TYPES.ListTasks) private listTasks: ListTasks,
    ) { }

    public async create(req: Request & IRequestUser, res: Response) {
        try {
            const user = req.user;
            const { title, description } = req.body;
            console.log(user);
            if (!user) return res.status(401).json({ error: "Unauthorized" });
            const task = await this.createTask.execute(user?.id!, title, description);
            if (!task) return res.status(400).json({ error: "Could not create task" });
            return res.status(200).json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async delete(req: Request & IRequestUser, res: Response) {
        try {
            const user = req.user;
            const id = req.params.id;
            if (!user) return res.status(401).json({ error: "Unauthorized" });
            await this.deleteTask.execute(user?.id!, id);
            res.status(200).json({});
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async update(req: Request & IRequestUser, res: Response) {
        try {
            const user = req.user;
            const id = req.params.id;
            const { title, description } = req.body;
            if (!user) return res.status(401).json({ error: "Unauthorized" });
            const updated = await this.updateTask.execute(user?.id!, id, title, description);
            res.status(200).json(updated);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async list(req: Request & IRequestUser, res: Response) {
        try {
            const user = req.user;
            const tasks = await this.listTasks.execute(user?.id!);
            res.status(200).json(tasks);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}