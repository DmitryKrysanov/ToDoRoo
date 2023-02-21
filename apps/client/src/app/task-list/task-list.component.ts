import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';

@Component({
  selector: 'todo-app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, LoaderComponent, TaskListItemComponent],
})
export class TaskListComponent {
  @Input() public tasks!: Task[];
  @Input() public isLoading!: boolean;
  @Output() public readonly edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() public readonly delete: EventEmitter<Task> =
    new EventEmitter<Task>();

  public onEdit(task: Task) {
    this.edit.emit(task);
  }

  public onDelete(task: Task) {
    this.delete.emit(task);
  }

  public trackByFn(_: number, item: Task) {
    return item.id;
  }
}
