import { useReducer } from 'react'
import { TodoContext } from './context'
import { todoReducer } from './reducer'
import { TodoState } from './types'

const initialTodoState: TodoState = {
  isTodoCreated: false,
  isDialogOpen: false
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  const setIsTodoCreated = (value: boolean): void => {
    dispatch({ type: 'SET_TODO_CREATED', payload: value })
  }

  const setIsDialogOpen = (value: boolean): void => {
    dispatch({ type: 'SET_DIALOG_OPEN', payload: value })
  }

  return (
    <TodoContext.Provider value={{ state, setIsDialogOpen, setIsTodoCreated }}>
      {children}
    </TodoContext.Provider>
  )
}
