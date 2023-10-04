import { HotKey } from '$globalTypes/globals'
import { useHotKeyLoader } from '@renderer/hotkeys'
import { FC, ReactNode, createContext } from 'react'

interface ContextProps {
  hotkeys: {
    keys: HotKey[]
    isLoading: boolean
  }
}

export const context = createContext({} as ContextProps)

interface ProviderProps {
  children: ReactNode
}

export const SettingsProvider: FC<ProviderProps> = ({ children }) => {
  const { isLoading, hotkeys } = useHotKeyLoader()

  return (
    <context.Provider
      value={{
        hotkeys: {
          isLoading,
          keys: hotkeys
        }
      }}
    >
      {children}
    </context.Provider>
  )
}
