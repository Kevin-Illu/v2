import { State, Todo, TodoResponse } from '$globalTypes/models'
import { MainDatabaseInstance, RunResult } from '@main/types'
import { ITodoRepository } from './ITodoRepository'

export class TodoRepository implements ITodoRepository {
  constructor(private db: MainDatabaseInstance) {}

  public getStates = (): Promise<State[]> => {
    return this.db.fetch<State>(`
      SELECT id
      , name AS state_name
      , description
      FROM states
    `)
  }

  public getAll = (): Promise<TodoResponse[]> => {
    return this.db.fetch<TodoResponse>(
      `
      SELECT  todos.id as todo_id
      , todos.created_date
      , todos.name as todo_name
      , todos.description as todo_description
      , todos.archived as todo_archived
      , states.name as state_name
      , states.description as state_description
      FROM todos INNER JOIN states
      ON todos.state_id = states.id
      ORDER BY todos.id DESC
    `
    )
  }

  public getById = (taskId: string): Promise<TodoResponse> => {
    return this.db.fetch<TodoResponse>('SELECT * FROM todos WHERE id = ?', [taskId])[0]
  }

  public create = (todo: Todo): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO todos (
        user_id
        , state_id
        , name
        , description
        , created_date
      )
      VALUES (
        1,           -- user_id
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATETIME('now') -- created_date
      )
    `,
      [todo.state_id, todo.name, todo.description]
    )
  }
}
