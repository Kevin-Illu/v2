import { TodoResponse } from '$globalTypes/models'

const TodosService = window.api.todos

/**
 * Obtiene la lista de todos desde el servicio y actualiza el estado con los resultados.
 */
export async function getTodosFromService(): Promise<TodoResponse[]> {
  return await TodosService.dataAccessor<TodoResponse[]>({ type: 'get-todos' })
}
