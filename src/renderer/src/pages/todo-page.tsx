import { Box, Heading } from '@radix-ui/themes'
import { TodoProvider } from '@renderer/context/todo'
import { Layout, TodoManager, TodoList } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <TodoProvider>
        <Box className="h-full w-full p-2">
          <Box className="py-8">
            <Heading>Your todos :)</Heading>
          </Box>
          <TodoList />
        </Box>

        <TodoManager />
      </TodoProvider>
    </Layout>
  )
}
