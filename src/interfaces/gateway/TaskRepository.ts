import { Task } from "../../entities/Task";

export default interface ITaskRepository {
    createTask: (title: string, description: string, userId: string) => Promise<Task | null>;
    findTaskById: (id: string) => Promise<Task | null>;
    findTasksByUserId: (userId: string) => Promise<Task[]>;
    updateTask: (id: string, title: string, description: string) => Promise<Task | null>;
    deleteTask: (id: string) => Promise<boolean>;
}