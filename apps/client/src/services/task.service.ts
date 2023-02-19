import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/v1';

  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  public get(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`).pipe(
      tap((tasks: Task[]) => this.tasksSubject.next(tasks.reverse())),
      catchError((error) => {
        return of(error);
      })
    );
  }

  public add(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }

  public edit(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}`, task).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }

  public delete(task: Task): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${task.id}`).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }
}
