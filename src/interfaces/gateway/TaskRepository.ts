import { Task } from "../../entities/Task";

export default interface ITaskRepository {
    createTask: (task: Task) => Promise<Task | null>;
    findTaskById: (id: string) => Promise<Task | null>;
    findTasksByUserId: (userId: string) => Promise<Task[]>;
    updateTask: (task: Task) => Promise<Task | null>;
    deleteTask: (id: string) => Promise<boolean>;
}