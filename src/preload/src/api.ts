import { ClientAction, SettignsActions, TodoActions } from '$globalTypes/comunication'
import { ipcRenderer } from 'electron'

type Accessor<TypeOfAction> = {
  dataAccessor<T>(action: ClientAction<TypeOfAction>): Promise<T>
}

export interface APIService {
  todos: Accessor<TodoActions>
  settings: Accessor<SettignsActions>
}

const api: APIService = {
  todos: {
    dataAccessor: (action) => ipcRenderer.invoke('services:todos', action)
  },
  settings: {
    dataAccessor: (action) => ipcRenderer.invoke('services:settings', action)
  }
}

export default api
