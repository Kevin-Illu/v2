import { Box, Heading, Separator } from '@radix-ui/themes'
import { TodoProvider } from '@renderer/context/todo'
import { Layout, TodoManager, TodoList } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <TodoProvider>
        <Box className="h-full w-full flex flex-col gap-2 py-4">
          <Box className="py-2">
            <Heading>Task List: Stay Organized and Productiv</Heading>
          </Box>
          <Separator orientation="horizontal" size="4" />
          <TodoList />
        </Box>

        <TodoManager />
      </TodoProvider>
    </Layout>
  )
}
