import { Actions } from '../main/src/types/service'

// representa una accion que puede ser
// disparada desde el renderer proces y
// que puede contener los datos necesarios para
// ser procesada en el main process
export type Action = {
  name: keyof Actions

  // representa los argumentos o datos
  // que se necesitan para ser despachada la accion
  payload?: any
}
