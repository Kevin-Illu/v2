import { ConfigContext } from '@renderer/providers/ConfigProvider'
import { ConfigState } from '@renderer/types/stores/configStore'
import { useContext } from 'react'
import { useStore } from 'zustand'

export default function useConfigContext<T>(selector: (state: ConfigState) => T): T {
  const store = useContext(ConfigContext)
  if (!store) throw new Error('Missing BearContext.Provider in the tree')
  return useStore(store, selector)
}
