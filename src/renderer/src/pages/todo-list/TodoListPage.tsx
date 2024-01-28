import { Todo } from '$globalTypes/databaseResponse'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { EmptyView } from './EmptyView'
import { TodoList } from './TodoList'
import * as React from 'react'
import { getTodos } from '@renderer/services/todos'

type TaskSetter = (value: React.SetStateAction<Todo[]>) => void

function getTodosFromService(setter: TaskSetter) {
  getTodos().then((todos) => {
    setter(todos)
  })
}

export function TodoListPage() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const setPageTitle = useConfigContext((s) => s.setDinamicTitle)
  const revalidateTasks = useConfigContext((s) => s.ui.todoList.revalidateList)
  const turnOnRevalidation = useConfigContext((s) => s.setListRevalidation)

  React.useEffect(() => setPageTitle('v2'), [])

  React.useEffect(() => {
    getTodosFromService(setTodos)
  }, [])

  React.useEffect(() => {
    if (revalidateTasks) {
      getTodosFromService(setTodos)

      // if revalidate then turn off
      turnOnRevalidation(false)
    }
  }, [revalidateTasks])

  const content = todos.length > 0 ? <TodoList todos={todos} /> : <EmptyView />

  return <div className="h-full mx-auto flex flex-col items-center">{content}</div>
}
