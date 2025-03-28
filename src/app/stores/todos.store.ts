import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { InitialState, Todo, TodosFilter } from '../model/todo.model';
import { computed, inject } from '@angular/core';
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
        },
        async toggleTodo(id: number, completed: boolean) {
            const todo = await todosService.updateTodo(id);
            patchState(store, (state) => ({
                todos: state.todos
                            .map(todo => todo.id == id ? {...todo, completed} : todo)
            }))
        },
        async updateFilter(filter: TodosFilter) {
            patchState(store, { filter });
        }
    })),
    withComputed((state) => ({
        filterTodos: computed(() => {
            const todos = state.todos();
            switch(state.filter()) {
                case 'all':
                    return todos;
                case 'pending':
                    return todos.filter(todo => !todo.completed);
                case 'completed': 
                    return todos.filter(todo => todo.completed);
            }
        })
    }))
)
