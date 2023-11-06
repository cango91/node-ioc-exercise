import { inject, injectable } from "inversify";
import IUserRepository from "../interfaces/repositories/IUserRepository";
import { TYPES } from "../../types";
import ITaskRepository from "../interfaces/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";


@injectable()
export default class UpdateTask {
    constructor(
        @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository
    ) { }
    public async execute(userId: string, task: Task) {
        const existingTask = await this.taskRepository.findTaskById(task.id);
        if (!existingTask) throw new Error("Task not found");
        if (task.userId !== existingTask.userId) throw new Error("Unauthorized");
        return await this.taskRepository.updateTask(task.id, task.title, task.description);
    }
}