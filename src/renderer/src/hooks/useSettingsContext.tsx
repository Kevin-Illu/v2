import { useContext } from 'react'
import { SettingsContext } from '@renderer/context'

// TODO: mejorar este hook para que exponga
// exponga una funcion que permita modificar cualquier
// propiedad de las configuraciones y que exponga las mismas
export const useSettingsContext = () => {
  const { settings } = useContext(SettingsContext)

  return settings
}
