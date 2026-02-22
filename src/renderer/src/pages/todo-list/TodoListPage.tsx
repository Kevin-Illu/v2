import { Todo } from '$globalTypes/databaseResponse'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { EmptyView } from './EmptyView'
import { TodoList } from './TodoList'
import * as React from 'react'
import { getTodos } from '@renderer/services/todos'
import { usePageSettings } from '@renderer/hooks/usePageSettings'

type TaskSetter = (value: React.SetStateAction<Todo[]>) => void

function getTodosFromService(setter: TaskSetter) {
  getTodos().then((todos) => {
    setter(todos)
  })
}

export function TodoListPage() {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const { setPageTitle, revalidateTasks, turnOnRevalidation } = useConfigContext((s) => ({
    setPageTitle: s.setDinamicTitle,
    revalidateTasks: s.ui.todoList.revalidateList,
    turnOnRevalidation: s.setListRevalidation
  }))

  usePageSettings({
    title: 'v2'
  })

  React.useEffect(() => {
    getTodosFromService(setTodos)
  }, [])

  React.useEffect(() => {
    if (revalidateTasks) {
      getTodosFromService(setTodos)

      // if revalidate is on then turn off
      turnOnRevalidation(false)
    }
  }, [revalidateTasks])

  const content = todos.length > 0 ? <TodoList todos={todos} /> : <EmptyView />

  return <div className="h-full mx-auto flex flex-col items-center">{content}</div>
}
