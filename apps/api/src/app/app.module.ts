import { Module } from '@nestjs/common';
import { databaseConfig } from '../config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './../tasks/tasks.module';
@Module({
  imports: [MongooseModule.forRoot(databaseConfig.uri), TasksModule],
})
export class AppModule {}
