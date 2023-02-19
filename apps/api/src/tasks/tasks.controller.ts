import {
  Controller,
  Get,
  Response,
  HttpStatus,
  Param,
  Body,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  public async getAll(@Response() res): Promise<Task[]> {
    const tasks = await this.tasksService.findAll();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Post('')
  public async create(@Body() body, @Response() res): Promise<Task> {
    const task = await this.tasksService.create(body);
    return res.status(HttpStatus.OK).json(task);
  }

  @Put(':id')
  public async update(
    @Param() params,
    @Body() body,
    @Response() res
  ): Promise<Task> {
    const article = await this.tasksService.update(params.id, body);
    return res.status(HttpStatus.OK).json(article);
  }

  @Delete(':id')
  public async delete(@Param() params, @Response() res): Promise<null> {
    await this.tasksService.delete(params.id);
    return res.status(HttpStatus.OK).json(null);
  }
}
