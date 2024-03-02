import createConfigStore from '@renderer/stores/config.store'

export type SuportedThemes = 'dark' | 'light' | 'system'

export interface ConfigProps {
  theme?: SuportedThemes
}

export interface ConfigState extends ConfigProps {
  ui: {
    navbar: {
      title: string
      dinamicTitle: string | null
    }
    todoList: {
      revalidateList: boolean
    }
  }
  setTheme: (theme: SuportedThemes) => void
  setListRevalidation: (revalidate: boolean) => void
  setDinamicTitle: (title: string) => void
}

export type ConfigStore = ReturnType<typeof createConfigStore>
