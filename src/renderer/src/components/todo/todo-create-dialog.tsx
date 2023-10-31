import { State, Todo } from '$globalTypes/models'
import { DialogContent, DialogDescription, DialogTitle, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { TodoCreateForm } from './todo-create-form'
import { useTodoContext } from '@renderer/hooks/useTodoContext'
import { createNewTodo, getTodoStates } from '@renderer/context/todo/todo-service'

export const TodoFormDialog = () => {
  const { setIsDialogOpen, setIsTodoCreated } = useTodoContext()
  const [todoStates, setTodoStates] = useState<State[]>([])

  useEffect(() => {
    getTodoStates().then((states) => {
      const CANCELED = 4
      const COMPLETED = 6
      const filteredStates = states.filter((s) => s.id !== CANCELED && s.id !== COMPLETED)

      setTodoStates(filteredStates)
    })
  }, [])

  const handleSubmit = (todo: Todo) => {
    createNewTodo(todo)
      .then(() => {
        setIsDialogOpen(false)
        setIsTodoCreated(true)
      })
      .catch(() => {
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
