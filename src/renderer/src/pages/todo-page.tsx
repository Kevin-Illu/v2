import { TodoProvider } from '@renderer/context/todo'
import { Layout, TodoManager, TodoList } from '@renderer/components'

export const TodoPage = () => {
  return (
    <Layout>
      <TodoProvider>
        <TodoList />

        <TodoManager />
      </TodoProvider>
    </Layout>
  )
}
