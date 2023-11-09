import { inject, injectable } from "inversify";
import ITaskRepository from "../../../application/interfaces/repositories/ITaskRepository";
import { Repository } from "typeorm";
import Task from "./entities/TaskEntity";
import IDbConnection from "../../../application/services/IDbConnection";
import { TYPES } from "../../../types";
import * as DomainTask from '../../../domain/entities/Task'

@injectable()
export default class TypeORMTaskRepository implements ITaskRepository {
    private taskRepo!: Repository<Task>;
    constructor(
        @inject(TYPES.IDbConnection) dbConnection: IDbConnection
    ) {
        dbConnection.connect(process.env.DB_URL!)
            .then(ds => {
                this.taskRepo = ds.getRepository(Task);
            }).catch(console.error);
    }
    async createTask(title: string, description: string, userId: string) {
        try {
            const task = this.taskRepo.create({
                title, description, user: { id: userId }
            });
            await this.taskRepo.save(task);
            return this.toDomainTask(task);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async findTaskById(id: string) {
        try {
            const task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });
            return this.toDomainTask(task!);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async findTasksByUserId(userId: string) {
        try {
            const tasks = await this.taskRepo.find(
                {
                    where: { user: { id: userId } },
                    relations: ['user']
                });
            if (!tasks.length) return [];
            return tasks.map(task => this.toDomainTask(task!)) as DomainTask.Task[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async updateTask(id: string, title: string, description: string) {
        try {
            let task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });
            if (task) {
                task.title = title;
                task.description = description;
                await this.taskRepo.save(task);
            }
            return this.toDomainTask(task!);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async deleteTask(id: string) {
        try {
            const task = await this.taskRepo.findOneBy({ id });
            if (!task) return false;
            await this.taskRepo.remove(task);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    private toDomainTask(taskEntity: Task): DomainTask.Task | null {
        if (!taskEntity) return null;

        // The `user` property of `taskEntity` must be loaded for this to work.
        // Ensure that when you load tasks, you also load the associated user.
        const { id, title, description, user } = taskEntity;


        return {
            id,
            title,
            description,
            userId: user.id
        };
    }

}