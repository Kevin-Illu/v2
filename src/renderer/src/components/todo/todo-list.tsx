import { TodoResponse } from '$globalTypes/globals'
import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'
import { TodoItem } from './todo-item'

export const TodoList = () => {
  const {
    state: { isTodoCreated },
    setIsTodoCreated
  } = useTodoContext()

  const [todos, setTodos] = useState<TodoResponse[]>([])
  const TodosService = window.api.todos

  function getTodos() {
    TodosService.dataAccessor<TodoResponse[]>({ name: 'get-todos' })
      .then((todos) => {
        setTodos(todos)
        console.log(todos)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // load the todos at the first time
  useEffect(() => {
    getTodos()
  }, [])

  useEffect(() => {
    if (isTodoCreated) {
      getTodos()
    }
  }, [isTodoCreated])

  useEffect(() => {
    setIsTodoCreated(false)
  }, [isTodoCreated])

  if (todos.length < 1) {
    return <Box>Nothing todo? lets create a new Todo</Box>
  }

  return (
    <Box className="flex flex-col gap-6 py-4">
      <header>
        <Flex justify="between" align="center">
          <Text>Todos</Text>
          <Box className="w-28">
            <Text>Actions</Text>
          </Box>
        </Flex>
      </header>
      {todos.map((todo) => (
        <TodoItem key={todo.todo_id} todo={todo} />
      ))}
    </Box>
  )
}
