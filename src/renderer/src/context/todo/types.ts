export interface TodoContextType {
  state: TodoState
  setIsTodoCreated: (value: boolean) => void
  setIsDialogOpen: (value: boolean) => void
}

export type TodoActionTypes = 'SET_TODO_CREATED' | 'SET_DIALOG_OPEN'

export interface TodoState {
  isTodoCreated: boolean
  isDialogOpen: boolean
}

export type TodoAction = { type: TodoActionTypes; payload: boolean }
