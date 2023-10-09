import React, { createContext, useReducer, ReactNode } from 'react'
import { todoReducer } from './reducer'
import { TodoAction, TodoState } from './types'

const initialTodoState: TodoState = {
  isTodoCreated: false,
  isDialogOpen: false
}

interface ITodoContext {
  state: TodoState
  dispatch: React.Dispatch<TodoAction>
}

export const TodoContext = createContext({} as ITodoContext)

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState)

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>
}
