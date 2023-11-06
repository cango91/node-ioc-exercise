import { inject, injectable } from "inversify";
import ITaskRepository from "../interfaces/repositories/ITaskRepository";
import { TYPES } from "../../types";

@injectable()
export default class ListTasks {
    constructor(
        @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository
    ) { }

    public async execute(userId: string) {
        return await this.taskRepository.findTasksByUserId(userId);
    }
}