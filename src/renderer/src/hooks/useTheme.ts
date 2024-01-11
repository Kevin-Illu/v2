import { useContext } from 'react'
import { ThemeProviderContext, ThemeProviderContextProps } from '../theme/ThemeProvider'

export const useTheme = (): ThemeProviderContextProps => {
  const context = useContext(ThemeProviderContext)
  return context
}
