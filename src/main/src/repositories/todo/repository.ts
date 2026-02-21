import { Todo, RawTodo, State } from '$globalTypes/databaseResponse'
import { MainDatabaseInstance, RunResult } from '@main/types'
import { formatRawData } from '../../utils/formatTodoRawResponse'

interface CreateTodoInput {
  state_id: number
  name: string
  description: string | null
}

interface ITodoRepository {
  createTodo(todo: CreateTodoInput): Promise<RunResult>
  getStates(): Promise<State[]>
  getTodos(): Promise<Todo[]>
  getTodoById(id: number): Promise<Todo>
  updateTodo(todo: Todo): Promise<RunResult>
}

export class TodoRepository implements ITodoRepository {
  constructor(private db: MainDatabaseInstance) {}

  public getStates = (): Promise<State[]> => {
    return this.db.fetch<State>(`
      SELECT id
      , name
      , description
      FROM states
    `)
  }

  public getTodos = async (): Promise<Todo[]> => {
    const ARCHIVED = '1'
    const todos = await this.db.fetch<RawTodo>(`SELECT * FROM Todos WHERE archived != ${ARCHIVED}`)
    return formatRawData(todos)
  }

  public getTodoById = async (id: number): Promise<Todo> => {
    const result = await this.db.fetch<Todo>('SELECT * FROM todos WHERE id = ?', [id])
    return result[0]
  }

  public createTodo = (todo: CreateTodoInput): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO todos (
        state_id
        , name
        , description
        , created_date
      )
      VALUES (
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATETIME('now') -- created_date
      )
    `,
      [todo.state_id, todo.name, todo.description]
    )
  }

  public updateTodo = async (todo: Todo): Promise<RunResult> => {
    const result = await this.db.execute(
      `
        UPDATE todos
        SET name = ?,
            archived = ?
        WHERE id = ?
      `,
      [todo.name, todo.archived ? 1 : 0, todo.id]
    )

    return result
  }
}
