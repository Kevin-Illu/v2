import { TodoManager, TodoList, InitialScreen } from '@renderer/components'
import { TodoResponse } from '$globalTypes/models'
import { useEffect, useState } from 'react'
import { useTodoContext } from '@renderer/hooks'
import { getTodosFromService } from '@renderer/context/todo/todo-service'

export const TodoPageController = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([])

  /*
   * actualiza el estado con los
   * todos optenidos desde el servicio
   */
  const getTodos = () =>
    getTodosFromService().then((todos) => {
      setTodos(todos)
    })

  const {
    state: { isTodoCreated },
    setIsTodoCreated
  } = useTodoContext()

  // cuando la pantalla cargue es necesario
  // optener la lista de todos
  useEffect(() => {
    getTodos()
  }, [])

  // cuando se crea un todo y se guarda
  // es necesario volver a consultar los todos
  // para optener el todo recien creado
  useEffect(() => {
    if (isTodoCreated) {
      getTodos()
    }
  }, [isTodoCreated])

  // cuando un todo es creado es necesario indicarlo
  // para volver a optener todos los todos desde el
  // servicio, cuando se crea un todo hay que cambiar
  // el estado a false para que no se abra el dialog
  useEffect(() => {
    setIsTodoCreated(false)
  }, [isTodoCreated])

  if (todos.length < 1) {
    return (
      <TodoManager hiddeButton>
        <InitialScreen />
      </TodoManager>
    )
  }

  return (
    <TodoManager>
      <TodoList todos={todos} />
    </TodoManager>
  )
}
