import { ClientAction, State, Todo, TodoActions, TodoResponse } from '$globalTypes/index'
import { ActionMap, ICommunicationService, MainDatabaseInstance, RunResult } from '@main/types'
import CommunicationService from '../communication-service'

export class TodoService extends CommunicationService implements ICommunicationService {
  public name: string = 'Todo'

  public actions: ActionMap<TodoActions>
  private db: MainDatabaseInstance

  constructor(db: MainDatabaseInstance) {
    super()
    this.db = db
    this.actions = {
      ['get-states']: {
        dispatch: this.getStates
      },
      ['get-todos']: {
        dispatch: this.getTodos
      },
      ['get-task-by-id']: {
        dispatch: (id: string): Promise<TodoResponse> => this.getTodoById(id)
      },
      ['create-new-todo']: {
        dispatch: (todo: Todo): Promise<RunResult> => this.createNewTodo(todo)
      }
    }
  }

  public getStates = (): Promise<State[]> => {
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

  public _dispatcher = <TodoActions>(action: ClientAction<TodoActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this.actions[type].dispatch(action.payload)
    }

    return this.actions[type].dispatch()
  }

  public initialize(): void {
    console.log('initializing TodoService')
    // ?INFO: necesito normalizar el channel name para que
    // sea igual en todos los lados, el channel name es utilizado
    // en el preload process por la api, talvez el channel name
    // deveria convinarse con el service.name?
    // ejemplo: chanel = `service:{this.name}`
    this.handleAction('services:todos', this._dispatcher)
  }

  public cleanup(): void {
    // TODO: clean the handle action from ipcMain
    console.log('close TodoService')
  }
}
