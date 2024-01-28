import { Todo } from '$globalTypes/databaseResponse'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Heading, IconButton, Text } from '@radix-ui/themes'
import { CreateTaskDialog } from './CreateTaskDialog'

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="max-w-3xl pt-14">
      <div className="pb-7">
        <Heading as="h1" className="pb-3">
          Your work
        </Heading>
      </div>
      <div className="flex flex-col gap-6">
        {todos.map((todo) => (
          <Box key={todo.id} className="flex flex-col gap-1">
            <Text weight="bold">{todo.name}</Text>
            <Text color="gray" className="truncate">
              {todo.description}
            </Text>
          </Box>
        ))}
      </div>

      <CreateTaskDialog>
        <IconButton type="submit">
          <PlusIcon />
        </IconButton>
      </CreateTaskDialog>
    </div>
  )
}
