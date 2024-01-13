import { Box, Link as RadixLink } from '@radix-ui/themes'
import { Todo } from '$globalTypes/databaseResponse'
import * as React from 'react'
import { Link } from 'react-router-dom'
import useConfigContext from './hooks/consumers/useConfigContext'
import { getTodos } from './services/todos'

function App(): JSX.Element {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const setWindowTitle = useConfigContext((s) => s.setDinamicTitle)

  React.useEffect(() => setWindowTitle('todo list'), [])

  React.useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos)
    })
  }, [])

  return <TodoList todos={todos} />
}

const TodoList = ({ todos }: { todos: Todo[] }) => {
  if (!todos.length) {
    return (
      <div>
        <p>start creating todos :)</p>
        <RadixLink asChild>
          <Link to={'/create'}>create new todo</Link>
        </RadixLink>
      </div>
    )
  }

  return (
    <div>
      {todos.map((todo) => (
        <Box key={todo.id}>{todo.name}</Box>
      ))}
    </div>
  )
}

export default App
