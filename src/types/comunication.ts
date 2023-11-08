import { State, Todo, User } from './models'

export type ClientAction<T> = {
  type: keyof T
  payload?: unknown
}

export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<Todo[]>
  ['get-task-by-id']: (id: string) => Promise<Todo>
  ['create-new-todo']: (todo: Todo) => Promise<any>
}

export type SettingsActions = {
  ['is-logged']: () => Promise<boolean>
}

export type AuthActions = {
  ['register-user']: (newUser: User) => Promise<boolean>
  ['get-user']: () => Promise<User | null>
}
