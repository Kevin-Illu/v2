import { Todo } from '$globalTypes/databaseResponse'
import * as React from 'react'
import useConfigContext from './hooks/consumers/useConfigContext'
import { getTodos } from './services/todos'
import { TodoListPage } from './pages'

function App(): JSX.Element {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const setPageTitle = useConfigContext((s) => s.setDinamicTitle)

  React.useEffect(() => setPageTitle('v2'), [])

  React.useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos)
    })
  }, [])

  return <TodoListPage todos={todos} />
}

export default App
