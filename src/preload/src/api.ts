import { Action, SettignsActions, TodoActions } from '$globalTypes/comunication'
import { ipcRenderer } from 'electron'

export interface APIService {
  todos: {
    get<T>(action: Action<TodoActions>): Promise<T>
  }
  settings: {
    get<T>(ations: Action<SettignsActions>): Promise<T>
  }
}

const api: APIService = {
  todos: {
    // eslint-disable-next-line prettier/prettier
    get: <T>(action: Action<TodoActions>): Promise<T> =>
      ipcRenderer.invoke('services:todos', action)
  },

  settings: {
    get: <T>(action: Action<SettignsActions>): Promise<T> =>
      ipcRenderer.invoke('services:settings', action)
  }
}

export default api
