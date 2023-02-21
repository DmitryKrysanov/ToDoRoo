import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Subject,
  takeUntil,
  Observable,
  switchMap,
  BehaviorSubject,
} from 'rxjs';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from '../services/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { Task } from '../models/task.model';
import { isLoading } from './shared/operators/is-loading.operator';

@Component({
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskListComponent],
  selector: 'todo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly taskService = inject(TaskService);
  public tasks$ = this.taskService.tasks$;

  private readonly destroy$: Subject<void> = new Subject();
  public readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public ngOnInit(): void {
    this.loadCommonData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public add(title: string): void {
    const task: Task = {
      title,
      isDone: false,
    };

    this.taskService
      .add(task)
      .pipe(
        isLoading(this.isLoading$),
        switchMap(() => this.get()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public edit(task: Task): void {
    this.taskService
      .edit(task)
      .pipe(
        isLoading(this.isLoading$),
        switchMap(() => this.get()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public delete(task: Task): void {
    this.taskService
      .delete(task)
      .pipe(
        isLoading(this.isLoading$),
        switchMap(() => this.get()),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private loadCommonData() {
    this.get().subscribe();
  }

  private get(): Observable<Task[]> {
    return this.taskService
      .get()
      .pipe(isLoading(this.isLoading$), takeUntil(this.destroy$));
  }
}
