import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { InitialState, Todo } from '../model/todo.model';
import { inject } from '@angular/core';
import { TodosService } from '../services/todos.service';

const initialState: InitialState = {
    todos: [],
    loading: false,
    filter: 'all'
}

export const TodosStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, todosService = inject(TodosService)) => ({
        async loadAllTodo() {
            patchState(store, { loading: true });
            const todos = await todosService.getTodos();
            patchState(store, { todos, loading: false });
        },
        async addTodo(title: string) {
            const todo = await todosService.addTodo({title, completed: false});
            patchState(store, (state) => ({
                todos: [...state.todos, todo],
            }));
        },
        async deleteTodo(id: number) {
            await todosService.deleteTodo(id);
            patchState(store, (state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
            }));
        }
    }))
)
