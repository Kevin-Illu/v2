import { ClientAction } from '$globalTypes/comunication'
import { Service } from './service'

export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}

export interface ICommunication extends Service {
  actions: ActionMap<any>
  _dispatcher: (action: ClientAction<any>) => Promise<void>
}
