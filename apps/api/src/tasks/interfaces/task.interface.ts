import { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  isDone: boolean;
  createdAt: string;
  id?: string;
}
