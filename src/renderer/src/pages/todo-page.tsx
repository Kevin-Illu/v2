import { Box } from '@radix-ui/themes'
import { Layout, TodoManager } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <Box className="h-full w-full p-2"></Box>
      <TodoManager />
    </Layout>
  )
}
