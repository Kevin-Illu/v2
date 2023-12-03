import { RunResult } from '@main/types'
import { Todo, Step, State } from '$globalTypes/databaseResponse'

export interface ITodoRepository {
  create(todo: Todo, user_id: number): Promise<RunResult>
  createStep(step: Step, todo_id: number): Promise<RunResult>

  getStates(): Promise<State[]>
  getAll(): Promise<Todo[]>
  getById(id: number): Promise<Todo>

  update(todo: Todo): Promise<RunResult>
  updateStep(step: Step): Promise<RunResult>
}
