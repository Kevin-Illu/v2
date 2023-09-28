import { Action } from '$globalTypes/comunication'
import { ipcRenderer } from 'electron'

export interface APIService {
  todos: {
    get<T>(action: Action): Promise<T>
  }
}

const api: APIService = {
  todos: {
    get: <T>(action: Action): Promise<T> =>
      ipcRenderer.invoke('services:todo', {
        name: action.name,
        payload: action.payload
      })
  }
}

export default api
