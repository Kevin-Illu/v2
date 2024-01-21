import { Todo } from '$globalTypes/databaseResponse'
import { EmptyView } from './EmptyView'
import { TodoList } from './TodoList'

export function TodoListPage({ todos }: { todos: Todo[] }) {
  const content = todos.length > 0 ? <TodoList todos={todos} /> : <EmptyView />

  return (
    <div className="h-full flex justify-center flex-col gap-6 items-center pt-16 max-w-3xl mx-auto my-0">
      {content}
    </div>
  )
}
