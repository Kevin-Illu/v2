import { Box, Em, Flex, Text } from '@radix-ui/themes'
import { TodoItem } from './todo-item'
import { TodoResponse } from '$globalTypes/models'
import { FC } from 'react'

interface TodoListProps {
  todos: TodoResponse[]
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <Box className="flex flex-col gap-6 py-4">
      <header>
        <Flex
          justify="between"
          align="center"
          className="text-zinc-600 dark:text-zinc-400 font-bold"
        >
          <Text>
            <Em>Todos</Em>
          </Text>
          <Box className="w-28">
            <Text>
              <Em>Actions</Em>
            </Text>
          </Box>
        </Flex>
      </header>
      <Flex direction="column" gap="4">
        {todos.map((todo) => (
          <TodoItem key={todo.todo_id} {...todo} />
        ))}
      </Flex>
    </Box>
  )
}
