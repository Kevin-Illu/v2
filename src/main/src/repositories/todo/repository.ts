import { Todo, RawTodo, State } from '$globalTypes/databaseResponse'
import { MainDatabaseInstance, RunResult } from '@main/types'

// TODO: es necesario mejorar y normalizar el return
// de cada funcion
interface ITodoRepository {
  // TODO: mejorar el tipado en los argumentos
  createTodo(todo: Partial<Todo>): Promise<RunResult>

  // TODO: crear nuevos tipos de dato reales, estos
  // seran una copia exacta de la respuesta de la BD
  getStates(): Promise<State[]>
  getTodos(): Promise<Todo[]>
  getTodoById(id: number): Promise<Todo>
}

// TODO: clean the return types of this repository
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
    return todos
  }

  public getTodoById = async (id: number): Promise<Todo> => {
    const result = await this.db.fetch<Todo>('SELECT * FROM todos WHERE id = ?', [id])
    return result[0]
  }

  public createTodo = (todo: Partial<Todo>): Promise<RunResult> => {
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
