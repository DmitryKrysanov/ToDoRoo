import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'todo-app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TaskListItemComponent {
  @Input() public task!: Task;
  @Output() public edit: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() public delete: EventEmitter<Task> = new EventEmitter<Task>();

  onEdit() {
    this.edit.emit({ ...this.task, isDone: !this.task.isDone });
  }

  onDelete() {
    this.delete.emit(this.task);
  }
}
