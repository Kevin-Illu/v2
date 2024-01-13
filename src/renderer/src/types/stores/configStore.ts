import createConfigStore from '@renderer/stores/config.store'

export type suportedThemes = 'dark' | 'light' | 'system'

export interface ConfigProps {
  theme: suportedThemes
}

export interface ConfigState extends ConfigProps {
  updateTheme: (theme: suportedThemes) => void
}

export type ConfigStore = ReturnType<typeof createConfigStore>
