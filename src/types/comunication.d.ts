import { HotKey } from './globals'

export type Action<T> = {
  name: keyof T
  payload: Parameters<ServiceActions[keyof ServiceActions]['dispatch']>[0] | null
}

export type TodoActions = {
  ['get-states']: () => Promise<State[]>
  ['get-todos']: () => Promise<Task[]>
  ['get-task-by-id']: (id: string) => Promise<Task>
}

export type SettignsActions = {
  ['get-hotkeys']: () => Promise<HotKey[]>
}
