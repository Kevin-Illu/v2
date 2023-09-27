import { Action, State } from '$globalTypes/index'
import { ActionMap, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'

class TodoService extends CommunicationService {
  public _actions: ActionMap
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
