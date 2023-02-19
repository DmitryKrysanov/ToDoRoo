import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../../../models/task.model';
import { TaskListItemComponent } from './task-list-item.component';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;
  const taskMock: Task = {
    title: 'Task 1',
    isDone: false,
  } as Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    component.task = taskMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit task when editTask clicked', () => {
    const editedTaskMock = { ...taskMock, isDone: !taskMock.isDone };
    const spy = jest.spyOn(component.edit, 'emit');

    component.onEdit();

    expect(spy).toHaveBeenCalledWith(editedTaskMock);
  });

  it('should emit task when deleteTask clicked', () => {
    const spy = jest.spyOn(component.delete, 'emit');

    component.onDelete();

    expect(spy).toHaveBeenCalledWith(taskMock);
  });
});
