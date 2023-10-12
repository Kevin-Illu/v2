import { ClientAction, TodoActions } from '$globalTypes/comunication'
import { ipcRenderer } from 'electron'

type Accessor<TypeOfAction> = {
  dataAccessor<T>(action: ClientAction<TypeOfAction>): Promise<T>
}

export interface APIService {
  todos: Accessor<TodoActions>
}

const api: APIService = {
  todos: {
    dataAccessor: (action) => ipcRenderer.invoke('services:todos', action)
  }
}

export default api
