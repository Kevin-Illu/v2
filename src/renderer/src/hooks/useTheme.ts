import useConfigContext from './consumers/useConfigContext'
import { suportedThemes } from '@renderer/types/stores/configStore'

export const useTheme = (): suportedThemes => {
  const theme = useConfigContext((store) => store.theme)
  return theme ?? 'system'
}
