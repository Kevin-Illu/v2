export interface TodoState {
  isTodoCreated: boolean
  isDialogOpen: boolean
}

export interface SetTodoCreatedAction {
  type: 'SET_TODO_CREATED'
  payload: boolean
}

export interface SetDialogOpenAction {
  type: 'SET_DIALOG_OPEN'
  payload: boolean
}

export type TodoAction = SetTodoCreatedAction | SetDialogOpenAction
