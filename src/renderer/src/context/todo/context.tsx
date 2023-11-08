import { createContext } from 'react'
import { TodoState } from './types'
import { TodoResponse } from '$globalTypes/databaseResponse'

export interface TodoContextType {
  state: TodoState
  setIsTodoCreated: (value: boolean) => void
  setIsDialogOpen: (value: boolean) => void
  setEditingTodo: (value: TodoResponse | null) => void
}

export const TodoContext = createContext({} as TodoContextType)
