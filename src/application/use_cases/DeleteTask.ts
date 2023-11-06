import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ITaskRepository from "../interfaces/repositories/ITaskRepository";
import IUserRepository from "../interfaces/repositories/IUserRepository";


@injectable()
export default class DeleteTask {
    constructor(
        @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository,
    ) { }

    public async execute(userId: string, taskId: string) {
        const task = await this.taskRepository.findTaskById(taskId);
        if(!task) throw new Error("Task not found");
        if(task.userId !== userId) throw new Error("Unauthorized");
        if(await this.taskRepository.deleteTask(taskId)){
            return true;
        }else{
            return false;
        }
    }
}