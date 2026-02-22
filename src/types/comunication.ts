import { State, Todo, User } from './databaseResponse'

export type ActionResult = {
  lastID: number
  changes: number
}

export type ClientAction<TActionMap, TType extends keyof TActionMap = keyof TActionMap> = {
  type: TType
  payload?: unknown
}

export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<Todo[]>
  ['get-task-by-id']: (id: number) => Promise<Todo>
  ['create-new-todo']: (todo: Todo) => Promise<ActionResult>
  ['update-todo']: (todo: Todo) => Promise<ActionResult>
}

export type SettingsActions = {
  ['is-logged']: () => Promise<boolean>
}

export type AuthActions = {
  ['register-user']: (newUser: User) => Promise<boolean>
  ['get-user']: () => Promise<User | null>
}
