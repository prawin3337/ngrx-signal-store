import { Injectable } from '@angular/core';
import { mockTodos } from '../model/moc.data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  async getTodos(): Promise<Todo[]> {
    await sleep(1000);
    return mockTodos;
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000);
    return { ...todo, id: mockTodos.length + 1, completed: false } as Todo;
  }
  
  async deleteTodo(id: number) {
    await sleep(500);
  }

  async updateTodo(id: number) {
    await sleep(500);
  }
}

async function sleep(ms: number) {
  await new Promise(resolve => setTimeout(resolve, ms));
}