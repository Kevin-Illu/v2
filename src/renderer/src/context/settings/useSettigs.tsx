import { useContext } from 'react'
import { context } from './context'

export const useSettings = () => {
  const { settings } = useContext(context)

  return settings
}
