import { useContext } from 'react'
import { TodoContext, type TodoState } from '../context/todo'

interface useTodoContextReturn {
  state: TodoState
  setIsTodoCreated: (value: boolean) => void
  setIsDialogOpen: (value: boolean) => void
}

export function useTodoContext(): useTodoContextReturn {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useTodoContext debe usarse dentro de un TodoProvider')
  }

  const { state, dispatch } = context

  const setIsTodoCreated = (value: boolean): void => {
    dispatch({ type: 'SET_TODO_CREATED', payload: value })
  }

  const setIsDialogOpen = (value: boolean): void => {
    dispatch({ type: 'SET_DIALOG_OPEN', payload: value })
  }

  return { setIsTodoCreated, setIsDialogOpen, state }
}
