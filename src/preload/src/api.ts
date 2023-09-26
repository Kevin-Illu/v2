import { State } from '$types/globals'
import { ipcRenderer } from 'electron'

const api = {
  todos: {
    get: (query): Promise<State[]> =>
      ipcRenderer.invoke('services:todo', {
        name: query
      })
  }
}

export default api
