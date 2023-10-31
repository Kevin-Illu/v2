import { TodoProvider } from '@renderer/context/todo'
import { Layout, TodoPageController } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <TodoProvider>
        <TodoPageController />
      </TodoProvider>
    </Layout>
  )
}
