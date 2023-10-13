export type ClientAction<T> = {
  type: keyof T
  payload?: Parameters<ServiceActions[keyof ServiceActions]['dispatch']>[0] | null
}

export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<Task[]>
  ['get-task-by-id']: (id: string) => Promise<Task>
  ['create-new-todo']: (todo: Todo) => Promise<any>
}

export type SettingsActions = {
  ['is-logged']: () => Promise<boolean>
}
