import { HotKey } from '$globalTypes/globals'

export interface SettingsContextProps {
  settings: {
    hotkeys: {
      keys: HotKey[]
      isLoading: boolean
    }
  }
}
