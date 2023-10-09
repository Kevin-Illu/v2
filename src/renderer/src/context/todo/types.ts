export type TodoActionTypes = 'SET_TODO_CREATED' | 'SET_DIALOG_OPEN'

export interface TodoState {
  isTodoCreated: boolean
  isDialogOpen: boolean
}

export type TodoAction = { type: TodoActionTypes; payload: boolean }
