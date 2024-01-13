import { createStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ConfigProps, ConfigState } from '../types/stores/configStore'

const createConfigStore = (initialProps: Partial<ConfigProps>) => {
  return createStore<ConfigState>()(
    persist(
      (set) => ({
        ...initialProps,
        updateTheme: (theme) => set(() => ({ theme }))
      }),
      {
        name: 'config',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
}

export default createConfigStore
