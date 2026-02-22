import { ClientAction } from '$globalTypes/comunication'
import { Service } from './service'

export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}

export interface ICommunication<
  TActions = Record<string, (...args: any[]) => Promise<unknown>>
> extends Service {
  actions: ActionMap<TActions>
  _dispatcher: (action: ClientAction<TActions>) => Promise<unknown>
}
