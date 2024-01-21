import { Todo } from '$globalTypes/databaseResponse'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, IconButton, Text } from '@radix-ui/themes'
import { CreateTaskDialog } from './CreateTaskDialog'

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Box key={todo.id} className="flex flex-col gap-1">
          <Text weight="bold">{todo.name}</Text>
          <Text color="gray">{todo.description}</Text>
        </Box>
      ))}

      <CreateTaskDialog>
        <IconButton type="submit">
          <PlusIcon />
        </IconButton>
      </CreateTaskDialog>
    </div>
  )
}
