import { createContext, ReactNode, useEffect, useState } from 'react'

type SuportedThemes = 'system' | 'light' | 'dark'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: SuportedThemes
  storageKey?: string
}

export interface ThemeProviderContextProps {
  theme: string
  setTheme: (theme: string) => void
}

const initialState: ThemeProviderContextProps = {
  theme: 'system',
  setTheme: () => null
}

export const ThemeProviderContext = createContext<ThemeProviderContextProps>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const contextValue: ThemeProviderContextProps = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
