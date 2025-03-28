import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
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
  filter = viewChild.required(MatButtonToggleGroup)

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }

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

  onFilterTodos($event: MatButtonToggleChange) {
    const filter = $event.value;
    this.store.updateFilter(filter);
  }
}
