export type TodoActions = {
  states: () => Promise<State[]>
}

export type Action = {
  name: keyof TodoActions
  payload: Parameters<ServiceActions[keyof ServiceActions]['dispatch']>[0]
}
