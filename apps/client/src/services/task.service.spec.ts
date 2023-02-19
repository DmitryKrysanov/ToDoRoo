import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;
  const tasksMock = [
    { id: '1', title: 'Task 1', isDone: false },
    { id: '2', title: 'Task 2', isDone: false },
  ] as Task[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TaskService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should return an observable with right data', (done) => {
      service.get().subscribe((tasks: Task[]) => {
        expect(tasks.length).toEqual(tasksMock.length);
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/v1/tasks'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(tasksMock);
    });
  });

  describe('create', () => {
    it('should return an observable with right data', (done) => {
      service.add(tasksMock[0]).subscribe((task: Task) => {
        expect(task).toEqual(tasksMock[0]);
        done();
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/api/v1/tasks`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(tasksMock[0]);
    });
  });

  describe('update', () => {
    it('should return an observable with right data', (done) => {
      service.edit(tasksMock[0]).subscribe((task: Task) => {
        expect(task).toEqual(tasksMock[0]);
        done();
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/api/v1/tasks/${tasksMock[0].id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(tasksMock[0]);
    });
  });

  describe('delete', () => {
    it('should return an observable with right data', (done) => {
      service.delete(tasksMock[0]).subscribe(() => done());

      const req = httpTestingController.expectOne(
        `http://localhost:3000/api/v1/tasks/${tasksMock[0].id}`
      );

      expect(req.request.method).toEqual('DELETE');

      req.flush(tasksMock[0]);
    });
  });
});
