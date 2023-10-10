import { TodoResponse } from '$globalTypes/globals'
import { useEffect, useState } from 'react'
import { Badge, Box, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks/useTodoContext'
import { ArchiveIcon, CheckIcon } from '@radix-ui/react-icons'

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
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // load the todos at the first time
  useEffect(() => {
    getTodos()
  }, [])

  // load the todos when the
  // \todo created function is called
  useEffect(() => {
    if (isTodoCreated) {
      getTodos()
    }
  }, [isTodoCreated])

  // when the create todo function is called
  // the isTodoCreted state is true
  // we need to revert the state to avoid the
  // getTodos function call
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
          <Flex justify="between" gap="4" className="rounded-md p-4 w-full">
            <Box>
              <header className="flex gap-4 pb-2">
                <Heading as="h4">{todo.todo_name}</Heading>
                <Badge radius="large">{todo.state_name}</Badge>
              </header>
              <div>
                <Text as="p" className="text_elipsis">
                  {todo.todo_description}
                </Text>
              </div>
              <footer>
                <Text>1 hour ago</Text>
              </footer>
            </Box>
          </Flex>

          <div className="rounded-md flex justify-between items-start gap-2 pt-4">
            <IconButton variant="outline" color="gray" radius="full">
              <ArchiveIcon />
            </IconButton>
            <IconButton variant="outline" radius="full" color="gray">
              <CheckIcon />
            </IconButton>
          </div>
        </Box>
      ))}
    </Box>
  )
}
