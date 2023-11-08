import CommunicationService from '../communication-service'
import { ITodoRepository, TodoRepository } from '../../repositories/todo'

import type { ClientAction, Todo, TodoActions, TodoResponse } from '$globalTypes/index'
import type { ActionMap, ICommunication, MainDatabaseInstance, RunResult } from '@main/types'

export class TodoService extends CommunicationService implements ICommunication {
  public name = 'Todo'
  public actions: ActionMap<TodoActions>

  private todoRepo: ITodoRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.todoRepo = new TodoRepository(db)
    this.actions = {
      ['get-states']: {
        dispatch: this.todoRepo.getStates
      },
      ['get-todos']: {
        dispatch: this.todoRepo.getAll
      },
      ['get-task-by-id']: {
        dispatch: (id: string): Promise<TodoResponse> => {
          return this.todoRepo.getById(id)
        }
      },
      ['create-new-todo']: {
        dispatch: (todo: Todo): Promise<RunResult> => {
          return this.todoRepo.create(todo)
        }
      },
      ['update-todo']: {
        dispatch: (todo: Todo): Promise<any> => {
          return this.todoRepo.update(todo)
        }
      }
    }
  }

  public _dispatcher = (action: ClientAction<TodoActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this.actions[type].dispatch(action.payload)
    }

    return this.actions[type].dispatch()
  }

  public initialize(): void {
    this.handleAction('services:todos', this._dispatcher)
  }

  public cleanup(): void {
    console.log('close TodoService')
  }
}
