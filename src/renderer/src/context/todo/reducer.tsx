import { TodoAction, TodoState } from './types'

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SET_TODO_CREATED':
      return { ...state, isTodoCreated: action.payload }
    case 'SET_DIALOG_OPEN':
      return { ...state, isDialogOpen: action.payload }
    case 'SET_EDITING_TODO':
      return { ...state, editingTodo: action.payload }
    default:
      return state
  }
}
