import { State, Todo } from '$globalTypes/globals'
import { DialogContent, DialogDescription, DialogTitle, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { TodoCreateForm } from './todo-create-form'
import { type RunResult } from 'sqlite3'
import { useTodoContext } from '@renderer/hooks/useTodoContext'

export const TodoFormDialog = () => {
  const { setIsDialogOpen, setIsTodoCreated } = useTodoContext()
  const [todoStates, setTodoStates] = useState<State[]>([])
  const TodosService = window.api.todos

  useEffect(() => {
    TodosService.dataAccessor<State[]>({ type: 'get-states' }).then((states) => {
      const CANCELED = 4
      const COMPLETED = 6
      const filteredStates = states.filter((s) => s.id !== CANCELED && s.id !== COMPLETED)

      setTodoStates(filteredStates)
    })
  }, [])

  const handleSubmit = (values: Todo) => {
    TodosService.dataAccessor<RunResult>({ type: 'create-new-todo', payload: values })
      .then(() => {
        setIsDialogOpen(false)
        setIsTodoCreated(true)
      })
      .catch(() => {
        // TODO: manejar el error adecuadamente
        setIsDialogOpen(false)
      })
  }

  return (
    <DialogContent className="max-w-sm">
      <DialogTitle>Make Every Day Count!</DialogTitle>
      <DialogDescription mb="4">
        <Text>Create tasks to inspire you to make the most of each day.</Text>
      </DialogDescription>

      <TodoCreateForm stateList={todoStates} handleSubmit={handleSubmit} />
    </DialogContent>
  )
}
