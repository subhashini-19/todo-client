import { Component } from '@angular/core';
import { Todo } from '../todo/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Todo],
  template: `<app-todo />`,
})
export class AppComponent {}