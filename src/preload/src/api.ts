import { AuthActions, ClientAction, TodoActions } from '$globalTypes/comunication'
import { ipcRenderer } from 'electron'

type Accessor<TypeOfAction> = {
  dataAccessor<T>(action: ClientAction<TypeOfAction>): Promise<T>
}

export interface APIService {
  todos: Accessor<TodoActions>
  auth: Accessor<AuthActions>
}

const api: APIService = {
  todos: {
    dataAccessor: (action) => ipcRenderer.invoke('services:todos', action)
  },
  auth: {
    dataAccessor: (action) => ipcRenderer.invoke('services:auth', action)
  }
}

export default api
