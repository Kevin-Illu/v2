import { State, Todo } from '$globalTypes/databaseResponse'

const service = window.api.todos

export function create(todo: Partial<Todo>) {
  return service.dataAccessor({ type: 'create-new-todo', payload: todo })
}

export function update(todo: Partial<Todo>) {
  return service.dataAccessor({ type: 'update-todo', payload: todo })
}

export function getTodos(): Promise<Todo[]> {
  return service.dataAccessor({ type: 'get-todos' })
}

export function getTodoStates(): Promise<State[]> {
  return service.dataAccessor({ type: 'get-states' })
}
