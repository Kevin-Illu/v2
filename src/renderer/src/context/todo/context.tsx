import { createContext } from 'react'
import { TodoState } from './types'

export interface TodoContextType {
  state: TodoState
  setIsTodoCreated: (value: boolean) => void
  setIsDialogOpen: (value: boolean) => void
}

export const TodoContext = createContext({} as TodoContextType)
