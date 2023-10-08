import { State, Todo } from '$globalTypes/globals'
import { DialogContent, DialogDescription, DialogTitle, Text } from '@radix-ui/themes'
import { useEffect, useState, FC } from 'react'
import { TodoCreateForm } from './todo-create-form'
import { type RunResult } from 'sqlite3'

interface TodoFormDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoFormDialog: FC<TodoFormDialogProps> = ({ setOpen }) => {
  const [todoStates, setTodoStates] = useState<State[]>([])
  const TodosService = window.api.todos

  useEffect(() => {
    TodosService.get<State[]>({ name: 'get-states', payload: null }).then((states) => {
      const CANCELED = 4
      const COMPLETED = 6
      const filteredStates = states.filter((s) => s.id !== CANCELED && s.id !== COMPLETED)

      setTodoStates(filteredStates)
    })
  }, [])

  const handleSubmit = (values: Todo) => {
    TodosService.insert<RunResult>({ name: 'insert-new-todo', payload: values })
      .then(() => {
        setOpen(false)
      })
      .catch(() => {
        // TODO: manejar el error adecuadamente
        setOpen(false)
      })
  }

  return (
    <DialogContent className="max-w-sm">
      <DialogTitle>Create a new Todo</DialogTitle>
      <DialogDescription mb="4">
        <Text>get started creating something fabolus!</Text>
      </DialogDescription>

      <TodoCreateForm stateList={todoStates} handleSubmit={handleSubmit} />
    </DialogContent>
  )
}
