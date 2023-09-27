import { Box } from '@radix-ui/themes'
import { AddTodo, Layout } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <Box className="h-full px-4 w-full"></Box>
      <AddTodo />
    </Layout>
  )
}
