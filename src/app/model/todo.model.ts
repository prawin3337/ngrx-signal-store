export type TodosFilter = 'all' | 'pending' | 'completed';

export type Todo = {
    id: number,
    title: string,
    completed: boolean
}


export type InitialState = {
    todos: Todo[],
    loading: boolean,
    filter: TodosFilter
}