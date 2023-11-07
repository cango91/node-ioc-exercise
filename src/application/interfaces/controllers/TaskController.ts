import { inject, injectable } from "inversify";
import CreateTask from "../../use_cases/CreateTask";
import { TYPES } from "../../../types";
import { Request, Response } from "express";
import IRequestUser from "./IRequestUser";
import DeleteTask from "../../use_cases/DeleteTask";
import UpdateTask from "../../use_cases/UpdateTask";
import ListTasks from "../../use_cases/ListTasks";
import ITaskController from "./ITaskController";
import CreateTaskDTO from "../../dto/CreateTask";
import TaskDTO from "../../dto/Task";
import UpdateTaskDTO from "../../dto/UpdateTask";

@injectable()
export class TaskController implements ITaskController {
    constructor(
        @inject(TYPES.CreateTask) private createTask: CreateTask,
        @inject(TYPES.DeleteTask) private deleteTask: DeleteTask,
        @inject(TYPES.UpdateTask) private updateTask: UpdateTask,
        @inject(TYPES.ListTasks) private listTasks: ListTasks,
    ) { }

    public async create(taskData: CreateTaskDTO, userId: string): Promise<TaskDTO> {
        const task = await this.createTask.execute(userId, taskData.title, taskData.description);
        if (!task) throw new Error("Could not create task");
        return task;
    }

    public async delete(taskId: string, userId: string): Promise<void> {
        await this.deleteTask.execute(userId, taskId);
    }

    public async update(taskId: string, taskData: UpdateTaskDTO, userId: string): Promise<TaskDTO | null> {
        const updatedTask = await this.updateTask.execute(userId, taskId, taskData.title!, taskData.description!);
        return updatedTask;
    }

    public async list(userId: string): Promise<TaskDTO[]> {
        const tasks = await this.listTasks.execute(userId);
        return tasks;
    }
}