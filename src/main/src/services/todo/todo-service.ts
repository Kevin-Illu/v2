import { ClientAction, Todo, TodoActions, TodoResponse } from '$globalTypes/index'
import { ActionMap, ICommunicationService, MainDatabaseInstance, RunResult } from '@main/types'
import CommunicationService from '../communication-service'
import { TodoRepository } from '@main/repositories/TodoRepository'

export class TodoService extends CommunicationService implements ICommunicationService {
  public name: string = 'Todo'
  public actions: ActionMap<TodoActions>

  private todoRepo: TodoRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.todoRepo = new TodoRepository(db)
    this.actions = {
      ['get-states']: {
        dispatch: this.todoRepo.getTodoStates
      },
      ['get-todos']: {
        dispatch: this.todoRepo.getTodos
      },
      ['get-task-by-id']: {
        dispatch: (id: string): Promise<TodoResponse> => {
          return this.todoRepo.getTodoById(id)
        }
      },
      ['create-new-todo']: {
        dispatch: (todo: Todo): Promise<RunResult> => {
          return this.todoRepo.createNewTodo(todo)
        }
      }
    }
  }

  public _dispatcher = <TodoActions>(action: ClientAction<TodoActions>): Promise<void> => {
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
    // TODO: clean the handle action from ipcMain
    console.log('close TodoService')
  }
}
