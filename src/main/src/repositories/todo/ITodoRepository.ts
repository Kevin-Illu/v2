import { RunResult } from '@main/types'
import { State, Todo } from '$globalTypes/models'
import { TodoResponse, TodosResponse } from '$globalTypes/databaseResponse'

export interface ITodoRepository {
  create(todo: Todo): Promise<RunResult>
  getStates(): Promise<State[]>
  getAll(): Promise<TodosResponse>
  getById(id: string): Promise<TodoResponse>
  update(todo: Todo): Promise<RunResult>
}
