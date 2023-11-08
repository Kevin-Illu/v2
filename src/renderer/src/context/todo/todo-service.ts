import { State, Todo } from '$globalTypes/models'
import { TodoResponse } from '$globalTypes/databaseResponse'
import { RunResult } from 'sqlite3'

const TodosService = window.api.todos

/**
 * Obtiene la lista de todos desde el servicio y actualiza el estado con los resultados.
 */
export async function getTodosFromService(): Promise<TodoResponse[]> {
  return await TodosService.dataAccessor<TodoResponse[]>({ type: 'get-todos' })
}

/**
 * Crea un nuevo todo llamando a la acción del servicio correspondiente.
 *
 * @param {Todo} todo - El objeto "Todo" que se va a crear.
 * @returns {Promise<RunResult>} Una promesa que se resuelve con el resultado de la acción.
 */
export async function createNewTodo(todo: Todo): Promise<RunResult> {
  const result = await TodosService.dataAccessor<RunResult>({
    type: 'create-new-todo',
    payload: todo
  })

  return result
}

/**
 * Optiene una lista de States del servicio
 * @returns {Promise<State[]>} una promesa que se resuleve con una lista de states
 */
export async function getTodoStates(): Promise<State[]> {
  return await TodosService.dataAccessor<State[]>({ type: 'get-states' })
}

export async function updateTodo(todo: Todo): Promise<boolean> {
  return await TodosService.dataAccessor<boolean>({ type: 'update-todo', payload: todo })
}
