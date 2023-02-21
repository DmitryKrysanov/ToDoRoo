import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    component.ngOnInit();

    expect(component.form).toBeTruthy();
  });

  it('should emit task title when onSubmit called', () => {
    const spy = jest.spyOn(component.title, 'emit');
    const titleMock = 'Task 1';

    component.ngOnInit();
    component.form?.get('title')?.setValue(titleMock);
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(titleMock);
  });

  it('should mark as touched form when onSubmit called', () => {
    component.ngOnInit();
    component.onSubmit();

    expect(component.form.touched).toBeTruthy();
  });
});
