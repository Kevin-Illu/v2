import { Todo } from '$globalTypes/databaseResponse'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Heading, IconButton, Text } from '@radix-ui/themes'
import { CreateTaskDialog } from './CreateTaskDialog'
import { ArchiveTodoButton } from './ArchiveTodoButton'

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="max-w-3xl pt-14 w-full">
      <div className="pb-7">
        <Heading as="h1" className="pb-3">
          Your work
        </Heading>
      </div>
      <div className="flex flex-col gap-6 min-w-full">
        {todos.map((todo) => (
          <div
            role="button"
            tabIndex={0}
            key={todo.id}
            className="min-w-full focus:outline-none focus:outline-2 focus:outline-[var(--accent-8)] flex items-center gap-8 hover:bg-black/10 py-4 px-6 rounded-md"
          >
            <ArchiveTodoButton todo={todo} />
            <Box className="flex flex-col gap-1 w-full overflow-hidden">
              <Text weight="bold">{todo.name}</Text>
              <Text color="gray" className="truncate">
                {todo.description}
              </Text>
            </Box>
          </div>
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
