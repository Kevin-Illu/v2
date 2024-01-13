import CommunicationService from '../communication'
import { TodoRepository } from '../../repositories/todo'

import type { Todo } from '$globalTypes/databaseResponse'
import type { ActionMap, ICommunication, MainDatabaseInstance, RunResult } from '@main/types'
import type { ClientAction, TodoActions } from '$globalTypes/index'

export class TodoService extends CommunicationService implements ICommunication {
  public name = 'Todo'
  public actions: ActionMap<TodoActions>
  private todoRepo: TodoRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.todoRepo = new TodoRepository(db)
    this.actions = {
      ['get-states']: {
        dispatch: this.todoRepo.getStates
      },
      ['get-todos']: {
        dispatch: this.todoRepo.getTodos
      },
      ['get-task-by-id']: {
        dispatch: (id: number): Promise<Todo> => {
          return this.todoRepo.getTodoById(id)
        }
      },
      ['create-new-todo']: {
        dispatch: (todo: Todo): Promise<RunResult> => {
          return this.todoRepo.createTodo(todo)
        }
      },
      ['update-todo']: {
        dispatch: (todo: Todo): Promise<any> => {
          return this.todoRepo.updateTodo(todo)
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
