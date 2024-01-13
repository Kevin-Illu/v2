import { createStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ConfigProps, ConfigState, suportedThemes } from '../types/stores/configStore'

const createConfigStore = (initialProps: Partial<ConfigProps>) => {
  return createStore<ConfigState>()(
    persist(
      (set) => ({
        ...initialProps,
        ui: {
          navbar: {
            title: 'v2',
            dinamicTitle: null
          }
        },
        setTheme: (theme: suportedThemes) => set(() => ({ theme })),
        setDinamicTitle: (newTitle) =>
          set((state) => ({
            ui: {
              ...state.ui,
              navbar: {
                ...state.ui.navbar,
                dinamicTitle: newTitle
              }
            }
          }))
      }),
      {
        name: 'config',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ theme: state.theme })
      }
    )
  )
}

export default createConfigStore
