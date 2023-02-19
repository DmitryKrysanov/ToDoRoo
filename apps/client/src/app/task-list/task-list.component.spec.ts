import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../../models/task.model';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  const tasksMock = [
    { id: '1', title: 'Task 1', isDone: false },
    { id: '2', title: 'Task 2', isDone: false },
  ] as Task[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.isLoading = false;
    component.tasks = tasksMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit task when editTask clicked', () => {
    const spy = jest.spyOn(component.edit, 'emit');

    component.onEdit(tasksMock[0]);

    expect(spy).toHaveBeenCalledWith(tasksMock[0]);
  });

  it('should emit task when deleteTask clicked', () => {
    const spy = jest.spyOn(component.delete, 'emit');

    component.onDelete(tasksMock[0]);

    expect(spy).toHaveBeenCalledWith(tasksMock[0]);
  });
});
