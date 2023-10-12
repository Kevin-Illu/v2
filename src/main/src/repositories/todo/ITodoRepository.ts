import { RunResult } from '@main/types'
import { State, Todo, TodoResponse } from '../../../../types/models'

export interface ITodoRepository {
  create(todo: Todo): Promise<RunResult>
  getStates(): Promise<State[]>
  getAll(): Promise<TodoResponse[]>
  getById(id: string): Promise<TodoResponse>
}
