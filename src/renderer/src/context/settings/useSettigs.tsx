import { useContext } from 'react'
import { context } from './context'

export const useSettigs = () => {
  const { hotkeys } = useContext(context)

  return {
    hotkeys
  }
}
