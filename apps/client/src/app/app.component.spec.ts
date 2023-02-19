import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      tasks$: of([]),
      get: jest.fn().mockReturnValue(of([])),
      add: jest.fn().mockReturnValue(of({})),
      edit: jest.fn().mockReturnValue(of({})),
      delete: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add task', () => {
    const taskMock = {
      title: 'Task 1',
      isDone: false,
    };

    component.add('Task 1');

    expect(taskServiceMock.add).toHaveBeenCalledWith(taskMock);
  });

  it('should edit task', () => {
    const taskMock = {
      title: 'Task 1',
      isDone: false,
    } as Task;

    component.edit(taskMock);

    expect(taskServiceMock.edit).toHaveBeenCalledWith(taskMock);
  });

  it('should delete task', () => {
    const taskMock = {
      title: 'Task 1',
      isDone: false,
    };

    component.delete(taskMock);

    expect(taskServiceMock.delete).toHaveBeenCalledWith(taskMock);
  });
});
