import { State, Todo, TodoResponse } from '$globalTypes/models'
import { MainDatabaseInstance, RunResult } from '@main/types'

export class TodoRepository {
  constructor(private db: MainDatabaseInstance) {}

  public getTodoStates = (): Promise<State[]> => {
    return this.db.fetch<State>(`
    SELECT s.id, s.name AS state_name, s.description, c.name AS color_name, c.hex_value
    FROM state AS s
    INNER JOIN color AS c ON c.id = s.color_id;
    `)
  }

  public getTodos = (): Promise<TodoResponse[]> => {
    return this.db.fetch<TodoResponse>(`
      SELECT  todo.id as todo_id
      , todo.created_time
      , todo.created_date
      , todo.name as todo_name
      , todo.description as todo_description
      , todo.archived as todo_archived
      , state.name as state_name
      , state.description as state_description
      FROM TODO INNER JOIN state
      on todo.state_id = state.id
      ORDER BY todo.id DESC
    `)
  }

  public getTodoById = (taskId: string): Promise<TodoResponse> => {
    return this.db.fetch<TodoResponse>('SELECT * FROM todo WHERE id = ?', [taskId])[0]
  }

  public createNewTodo = (todo: Todo): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO todo (user_id, state_id, name, description, created_date, created_time, color_id)
      VALUES (
        1,           -- user_id
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATE('now'), -- created_date
        TIME('now'), -- created_time
        ?            -- color_id
      )
    `,
      [todo.state_id, todo.name, todo.description, 1]
    )
  }
}
