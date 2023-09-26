import { ipcRenderer } from 'electron'

const api = {
  todos: {
    get: <T>(query: string): Promise<T> =>
      ipcRenderer.invoke('services:todo', {
        name: query
      })
  }
}

export default api
