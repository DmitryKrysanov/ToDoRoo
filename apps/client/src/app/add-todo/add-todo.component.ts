import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LoaderComponent } from '../shared/components/loader/loader.component';

type AddTodoForm = FormGroup<{
  title: FormControl<string>;
}>;

@Component({
  selector: 'todo-app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent implements OnInit {
  @Output() public title: EventEmitter<string> = new EventEmitter<string>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  public form!: AddTodoForm;

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.title.emit(this.form.value.title);
    this.form.reset();
  }
}
