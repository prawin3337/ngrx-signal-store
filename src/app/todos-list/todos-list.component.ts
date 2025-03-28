import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodosStore } from '../stores/todos.store';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todos-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgStyle
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore)

  async addTodo(title: string) {
    await await this.store.addTodo(title);
  }

  async deleteTodo($event: MouseEvent, id: number) {
    $event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async updateTodo(id: number, completed: boolean) {
    await this.store.toggleTodo(id, completed)
  }
}
