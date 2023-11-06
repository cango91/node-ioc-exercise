import { inject, injectable } from "inversify";
import CreateTask from "../../use_cases/CreateTask";
import { TYPES } from "../../../types";
import { Request, Response } from "express";
import IRequestUser from "./IRequestUser";

@injectable()
export class TaskController {
    constructor(
        @inject(TYPES.CreateTask) private createTask: CreateTask
    ) { }

    public async create(req: Request & IRequestUser, res: Response): Promise<void> {
        try {
            const user = req.user;
            const { title, description } = req.body;
            if (!user) res.status(401).json({ error: "Unauthorized" });
            const task = await this.createTask.execute(user?.id!, title, description);
            if (!task) res.status(400).json({ error: "Could not create task" });
            res.status(200).json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}