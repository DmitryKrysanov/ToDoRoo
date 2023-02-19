import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
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
