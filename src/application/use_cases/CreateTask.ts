import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import ITaskRepository from "../interfaces/repositories/ITaskRepository";
import IUserRepository from "../interfaces/repositories/IUserRepository";

@injectable()
export default class CreateTask{
    constructor(
        @inject(TYPES.ITaskRepository) private taskRepository: ITaskRepository,
    ){}
    async execute(userId: string, title: string, descripton: string){
        return await this.taskRepository.createTask(title, descripton,userId);
    }
}