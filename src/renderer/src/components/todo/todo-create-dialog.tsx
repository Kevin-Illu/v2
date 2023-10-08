import { State } from '$globalTypes/globals'
import { DialogContent, DialogDescription, DialogTitle, Text } from '@radix-ui/themes'
import { useEffect, useState, FC } from 'react'
import { TodoCreateForm } from './todo-create-form'

interface TodoFormDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoFormDialog: FC<TodoFormDialogProps> = ({ setOpen }) => {
  const [todoStates, setTodoStates] = useState<State[]>([])
  const fetchStates = window.api.todos

  useEffect(() => {
    fetchStates.get<State[]>({ name: 'get-states', payload: null }).then((states) => {
      const CANCELED = 4
      const COMPLETED = 6
      const filteredStates = states.filter((s) => s.id !== CANCELED && s.id !== COMPLETED)

      setTodoStates(filteredStates)
    })
  }, [])

  const handleSubmit = (values) => {
    console.log(values)
    setOpen(false)
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
