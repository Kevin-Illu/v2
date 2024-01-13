import { ConfigState, suportedThemes } from '@renderer/types/stores/configStore'

export function setDefaultTheme(theme: suportedThemes) {
  const root = window.document.documentElement

  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    root.classList.add(systemTheme)
    return
  }

  root.classList.add(theme)
}

export function getStorageTheme(): suportedThemes {
  const theme = (JSON.parse(localStorage.getItem('config')!) as { state: ConfigState }).state.theme
  return theme
}
