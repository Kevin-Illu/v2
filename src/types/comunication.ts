import { Todo as TodoResponse } from './databaseResponse'
import { State, Todo, User } from './models'

export type ClientAction<T> = {
  type: keyof T
  payload?: unknown
}

// TODO: mejorar el type de los returns
export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<TodoResponse[]>
  ['get-task-by-id']: (id: string) => Promise<TodoResponse>
  ['create-new-todo']: (todo: Todo) => Promise<any>
  ['update-todo']: (todo: Todo) => Promise<any>
}

export type SettingsActions = {
  ['is-logged']: () => Promise<boolean>
}

export type AuthActions = {
  ['register-user']: (newUser: User) => Promise<boolean>
  ['get-user']: () => Promise<User | null>
}
