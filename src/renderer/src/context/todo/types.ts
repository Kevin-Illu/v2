import { TodoResponse } from '$globalTypes/databaseResponse'

export interface TodoState {
  isTodoCreated: boolean
  isDialogOpen: boolean
  editingTodo: TodoResponse | null
}

export interface SetTodoCreatedAction {
  type: 'SET_TODO_CREATED'
  payload: boolean
}

export interface SetDialogOpenAction {
  type: 'SET_DIALOG_OPEN'
  payload: boolean
}

export interface SetEditingTodoAction {
  type: 'SET_EDITING_TODO'
  payload: TodoResponse | null
}

export type TodoAction = SetTodoCreatedAction | SetDialogOpenAction | SetEditingTodoAction
