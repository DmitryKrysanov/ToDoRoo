import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todo-app-loader',
  template: ` <span class="loader"></span> `,
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
