import { FormControl, FormGroup } from '@angular/forms';

export type AddTaskForm = FormGroup<{
  title: FormControl<string>;
}>;
