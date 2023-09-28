import { Action, State, Task, TodoActions } from '$globalTypes/index'
import { ActionMap, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'

class TodoService extends CommunicationService {
  public _actions: ActionMap<TodoActions>

  private _db: MainDatabaseInstance

  constructor(db: MainDatabaseInstance, name: string) {
    super(name)
    this._db = db

    this._actions = {
      states: {
        dispatch: this.getStates
      }
    }
  }

  _dispatcher = (action: Action): Promise<void> => {
    const actionName = action.name as string
    return this._actions[actionName].dispatch()
  }

  public getStates = (): Promise<State[]> => {
    return this._db.queryRunner.fetch<State[]>('SELECT * FROM state')
  }

  public getTaskById = (action: Action): Promise<Task[]> => {
    const id = action.payload
    return this._db.queryRunner.fetch<Task[]>('SELECT * FROM todos WHERE id = ?', id)
  }

  public initialize(): void {
    console.log('initializing TodoService')
    this.handleAction('services:todo', this._dispatcher)
  }

  public cleanup(): void {
    // TODO: clean the handle action from ipcMain
    console.log('close TodoService')
  }
}

export default TodoService
