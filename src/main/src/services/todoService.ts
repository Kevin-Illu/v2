import Service from './service'
import { State } from '$types/globals'
import { Action } from '$types/comunication'
import { Actions, Database, DerivedService } from '../../types'

class TodoService extends Service implements DerivedService {
  public actions: Actions

  constructor(db: Database) {
    super(db)
    this.actions = {
      states: {
        dispatch: this.getStates
      }
    }
    this.handleAction('services:todo', this.dispatcher)
  }

  private dispatcher = async (action: Action): Promise<string> => {
    return this.actions[action.name].dispatch()
  }

  public getStates = (): Promise<State[]> => {
    return this.db.queryRunner.fetch<State>('SELECT * FROM state')
  }
}

export default TodoService
