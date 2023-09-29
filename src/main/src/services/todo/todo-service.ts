import { Action, State, Todo, TodoActions } from '$globalTypes/index'
import { ActionMap, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'

class TodoService extends CommunicationService {
  public _actions: ActionMap<TodoActions>

  private _db: MainDatabaseInstance

  constructor(db: MainDatabaseInstance, name: string) {
    super(name)
    this._db = db

    this._actions = {
      ['get-states']: {
        dispatch: this.getStates
      },
      ['get-todos']: {
        dispatch: this.getTodos
      },
      ['get-task-by-id']: {
        dispatch: (id: string): Promise<Todo> => this.getTaskById(id)
      }
    }
  }

  public getStates = (): Promise<State[]> => {
    return this._db.queryRunner.fetch<State[]>(`
    SELECT s.id, s.name AS state_name, s.description, c.name AS color_name, c.hex_value
    FROM state AS s
    INNER JOIN color AS c ON c.id = s.color_id;
    `)
  }

  public getTodos = (): Promise<Todo[]> => {
    return this._db.queryRunner.fetch<Todo[]>('SELECT * FROM todos')
  }

  public getTaskById = (taskId: string): Promise<Todo> => {
    return this._db.queryRunner.fetch<Todo[]>('SELECT * FROM todos WHERE id = ?', taskId)[0]
  }

  public initialize(): void {
    console.log('initializing TodoService')
    this.handleAction('services:todo', this._dispatcher)
  }

  _dispatcher = (action: Action): Promise<void> => {
    const actionName = action.name as string
    return this._actions[actionName].dispatch()
  }

  public cleanup(): void {
    // TODO: clean the handle action from ipcMain
    console.log('close TodoService')
  }
}

export default TodoService
