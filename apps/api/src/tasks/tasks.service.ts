import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDto } from './dto/create.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(dto: CreateDto): Promise<Task> {
    const newtask = new this.taskModel(dto);

    try {
      await newtask.save();
      return newtask;
    } catch {
      throw new HttpException('Something went wrong', 400);
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskModel.find();
    } catch {
      throw new HttpException('Tasks not found', 400);
    }
  }

  async update(id: string, updatedtask: Task): Promise<Task> {
    try {
      return await this.taskModel.findByIdAndUpdate(id, updatedtask, {
        new: true,
      });
    } catch {
      throw new HttpException('Task not found. Please check task id', 400);
    }
  }

  async delete(id: string): Promise<Task> {
    try {
      return await this.taskModel.findByIdAndRemove(id);
    } catch {
      throw new HttpException('Task not found. Please check task id', 400);
    }
  }
}
