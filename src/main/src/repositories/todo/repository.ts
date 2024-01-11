import { Todo, RawTodo, State, Step } from '$globalTypes/databaseResponse'
import { MainDatabaseInstance, RunResult } from '@main/types'
import { formatRawData } from '../../utils/formatTodoRawResponse'

// TODO: es necesario mejorar y normalizar el return
// de cada funcion
interface ITodoRepository {
  // TODO: mejorar el tipado en los argumentos
  createTodo(todo: Partial<Todo>, user_id: number): Promise<RunResult>
  createStep(step: Partial<Step>, todo_id: number): Promise<RunResult>

  // TODO: crear nuevos tipos de dato reales, estos
  // seran una copia exacta de la respuesta de la BD
  getStates(): Promise<State[]>
  getTodos(): Promise<Todo[]>
  getTodoById(id: number): Promise<Todo>
  getStepById(id: number): Promise<Step>

  // TODO: agregar mas propiedades editables a las consutlas,
  // mejorar el tipado de los argumentos para indicar que propiedad es obligatoria
  // y cual no lo es
  updateTodo(todo: Todo): Promise<RunResult>
  updateStep(step: Step): Promise<RunResult>
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
    const rawData = await this.db.fetch<RawTodo>(`SELECT * FROM Todos`)

    const formatedData = formatRawData(rawData)
    return formatedData
  }

  public getTodoById = async (id: number): Promise<Todo> => {
    const result = await this.db.fetch<Todo>('SELECT * FROM todos WHERE id = ?', [id])
    return result[0]
  }

  public createTodo = (todo: Partial<Todo>, user_id: number): Promise<RunResult> => {
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
        ?,           -- user_id
        ?,           -- state_id
        ?,           -- name
        ?,           -- description
        DATETIME('now') -- created_date
      )
    `,
      [user_id, todo.state_id, todo.name, todo.description]
    )
  }

  public updateTodo = async (todo: Todo): Promise<RunResult> => {
    const result = await this.db.execute(
      `
        UPDATE todos
        SET name = ?
        WHERE id = ?
      `,
      [todo.name, todo.id]
    )

    return result
  }

  public createStep = (step: Partial<Step>, todo_id: number): Promise<RunResult> => {
    return this.db.execute(
      `
      INSERT INTO steps
      (todo_id, parent_step_id, name, description, completed)
      VALUES (?, ?, ?, ?, ?)
      `,
      [todo_id, step.parent_step_id, step.name, step.description, step.completed]
    )
  }

  public updateStep = (step: Step): Promise<RunResult> => {
    return this.db.execute(
      `
      UPDATE steps
      SET name = ?,
        description = ?,
        completed = ?
      WHERE id = ?`,
      [step.name, step.description, step.completed, step.id]
    )
  }

  public getStepById = async (id: number): Promise<Step> => {
    const result = await this.db.fetch<Step>('SELECT * FROM steps WHERE id = ?', [id])
    return result[0]
  }
}
