import { injectable } from "inversify";
import ITaskRepository from "../../../application/interfaces/repositories/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import TaskModel from "./TaskSchema";
import mongoose from "mongoose";


@injectable()
export default class MongoTaskRepository implements ITaskRepository {
    async createTask(title: string, description: string, userId: string): Promise<Task | null> {
        try {
            const task = new TaskModel({ title, description, userId });
            await task.save();
            return this.toTask(task!);
        } catch (error) {
            // handle error
            console.error(error);
            return null;
        }
    }

    async updateTask(id: string, title: string, description: string): Promise<Task | null> {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            return this.toTask(task!);
        } catch (error) {
            // handle error
            console.error(error);
            return null;
        }
    }

    async deleteTask(id: string): Promise<boolean> {
        try {
            const result = await TaskModel.deleteOne({ _id: id });
            return result.deletedCount > 0;
        } catch (error) {
            // handle error
            console.error(error);
            return false;
        }
    }

    async findTaskById(id: string): Promise<Task | null> {
        try {
            const task = await TaskModel.findById(id);
            return this.toTask(task!);
        } catch (error) {
            // handle error
            console.error(error);
            return null;
        }
    }

    async findTasksByUserId(userId: string): Promise<Task[]> {
        try {
            const tasks = await TaskModel.find({ userId });
            if(!tasks.length) return [];
            return tasks.map(task => this.toTask(task)) as Task[];
        } catch (error) {
            // handle error
            console.error(error);
            return [];
        }
    }
    private toTask(doc: mongoose.Document): Task | null {
        if(!doc) return null;
        const { _id, title, description, userId } = doc.toObject();
        return { id: _id.toString(), title, description, userId: userId.toString() };
    }
}