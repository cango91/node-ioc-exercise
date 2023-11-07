import CreateTaskDTO from "../../dto/CreateTask";
import TaskDTO from "../../dto/Task";
import UpdateTaskDTO from "../../dto/UpdateTask";

export default interface ITaskController {
    create(taskData: CreateTaskDTO, userId: string): Promise<TaskDTO |null>;
    delete(taskId: string, userId: string): Promise<void>;
    update(taskId: string, taskData: UpdateTaskDTO, userId: string): Promise<TaskDTO | null>;
    list(userId: string): Promise<TaskDTO[]>;
}