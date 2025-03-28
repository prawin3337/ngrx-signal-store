import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './stores/todos.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-signal-store';
}
