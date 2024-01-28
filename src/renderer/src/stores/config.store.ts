import { createStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ConfigProps, ConfigState, suportedThemes } from '../types/stores/configStore'

type setStore = (
  partial:
    | ConfigState
    | Partial<ConfigState>
    | ((state: ConfigState) => ConfigState | Partial<ConfigState>),
  replace?: boolean | undefined
) => void

const createConfigStore = (initialProps: Partial<ConfigProps>) => {
  return createStore<ConfigState>()(
    persist(
      (set: setStore) => ({
        ...initialProps,
        ui: {
          navbar: {
            title: 'v2',
            dinamicTitle: null
          },
          todoList: {
            revalidateList: false
          }
        },
        setTheme: (theme: suportedThemes) => set(() => ({ theme })),
        setListRevalidation: (revalidate: boolean) =>
          set((state) => ({
            ui: {
              ...state.ui,
              todoList: {
                ...state.ui.todoList,
                revalidateList: revalidate
              }
            }
          })),
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
