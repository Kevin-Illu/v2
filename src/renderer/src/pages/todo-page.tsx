import { TodoResponse } from '$globalTypes/globals'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { Layout, TodoManager } from '@renderer/components'
import { useEffect, useState } from 'react'

export const TodoPage = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([])
  const [isTodoCreated, setIsTodoCreated] = useState(false)
  const TodosService = window.api.todos.dataAccessor

  useEffect(() => {
    function getTodos() {
      TodosService<TodoResponse[]>({ name: 'get-todos' }).then((t) => {
        setTodos(t)
      })
    }

    getTodos()
    return () => {
      getTodos()
    }
  }, [isTodoCreated])

  useEffect(() => {
    setIsTodoCreated(false)
  }, [isTodoCreated])

  return (
    <Layout>
      <Box className="h-full w-full p-2">
        <Box className="py-8">
          <Heading>Your todos :)</Heading>
        </Box>
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
      </Box>
      <TodoManager setIsTodoCreated={setIsTodoCreated} />
    </Layout>
  )
}
