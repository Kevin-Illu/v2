import { useContext } from 'react'
import { TodoContext, TodoContextType } from '../context/todo'

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext)
  return context
}
