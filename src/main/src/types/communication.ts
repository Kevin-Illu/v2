import { ClientAction } from '$globalTypes/comunication'
import { Service } from './service'

export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}

export interface ICommunicationService extends Service {
  _actions: ActionMap<any>
  _dispatcher: <T>(action: ClientAction<T>) => Promise<void>
}
