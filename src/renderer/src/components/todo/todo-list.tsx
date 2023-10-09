import { TodoResponse } from '$globalTypes/globals'
import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks/useTodoContext'

export const TodoList = () => {
  const {
    state: { isTodoCreated },
    setIsTodoCreated
  } = useTodoContext()

  const [todos, setTodos] = useState<TodoResponse[]>([])
  const TodosService = window.api.todos

  useEffect(() => {
    function getTodos() {
      TodosService.dataAccessor<TodoResponse[]>({ name: 'get-todos' })
        .then((todos) => {
          setTodos(todos)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    if (isTodoCreated) {
      console.log('todo created, saved and loaded')
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
    <Box className="flex flex-col gap-4">
      {todos.map((todo) => (
        <Box key={todo.todo_id} className="flex justify-between gap-4">
          <div className="rounded-md p-4 bg-slate-200 w-full flex-1"></div>

          <Flex justify="between" className="rounded-md p-4 bg-slate-200 w-full">
            <Heading as="h4">{todo.todo_name}</Heading>
            <Flex>
              <Text>{todo.state_name}</Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>
  )
}
