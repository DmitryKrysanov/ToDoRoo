import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
import { AddTaskForm } from '../../models/add-task-form.model';

@Component({
  selector: 'todo-app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent implements OnInit {
  @Output() public title: EventEmitter<string> = new EventEmitter<string>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  public form: AddTaskForm;

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
