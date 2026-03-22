
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css'],
})
export class Todo implements OnInit {
  todos = signal<any[]>([]);
  newTodo = signal('');
  loading = signal(false);
  error = signal('');
  completedCount = signal(0);

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading.set(true);
    this.error.set('');
    this.todoService.getTodos().subscribe({
      next: (res: any) => {
        const todoList = res.data.getTodos || [];
        this.todos.set(todoList);
        this.updateCompletedCount();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load todos');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  updateCompletedCount() {
    const completed = this.todos().filter((t) => t.completed).length;
    this.completedCount.set(completed);
  }

  addTodo() {
    if (!this.newTodo().trim()) return;

    this.loading.set(true);
    this.error.set('');
    this.todoService.addTodo(this.newTodo()).subscribe({
      next: () => {
        this.newTodo.set('');
        this.loadTodos();
      },
      error: (err) => {
        this.error.set('Failed to add todo');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  toggle(todo: any) {
    this.todoService.toggleTodo(todo.id).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => {
        this.error.set('Failed to update todo');
        console.error(err);
      },
    });
  }

  delete(id: string) {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (err) => {
        this.error.set('Failed to delete todo');
        console.error(err);
      },
    });
  }
}