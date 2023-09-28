export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<Task[]>
  ['get-task-by-id']: (id: string) => Promise<Task>
}

export type Action = {
  name: keyof TodoActions
  payload: Parameters<ServiceActions[keyof ServiceActions]['dispatch']>[0] | null
}
