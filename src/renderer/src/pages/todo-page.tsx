import { Box, Heading, Separator } from '@radix-ui/themes'
import { TodoProvider } from '@renderer/context/todo'
import { Layout, TodoManager, TodoList } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <TodoProvider>
        {/* <Box className="h-full w-full flex flex-col gap-8">
          <Box className="pt-8">
            <Heading as="h1">Task List: Stay Organized and Productiv</Heading>
          </Box>
          <Separator orientation="horizontal" size="4" />
        </Box> */}
        <TodoList />

        <TodoManager />
      </TodoProvider>
    </Layout>
  )
}
