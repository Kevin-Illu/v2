import { ClientAction } from '$globalTypes/comunication'
import { Service } from './service'

export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}

export interface ICommunication<
  TActions extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>
> extends Service {
  actions: ActionMap<TActions>
  _dispatcher: (action: ClientAction<TActions>) => Promise<unknown>
}
