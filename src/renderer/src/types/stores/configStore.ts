import createConfigStore from '@renderer/stores/config.store'

export type suportedThemes = 'dark' | 'light' | 'system'

export interface ConfigProps {
  theme?: suportedThemes
}

export interface ConfigState extends ConfigProps {
  ui: {
    navbar: {
      title: string
      dinamicTitle: string | null
    }
  }
  setTheme: (theme: suportedThemes) => void
  setDinamicTitle: (title: string) => void
}

export type ConfigStore = ReturnType<typeof createConfigStore>
