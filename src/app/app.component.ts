import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './stores/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe, TodosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ngrx-signal-store';
  store = inject(TodosStore)

  async ngOnInit(): Promise<void> {
    await this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    await this.store.loadAllTodo()
  }
}
