import { Action } from '$globalTypes/comunication'
import { Service } from './service'

/**
 * Representa un mapa de acciones donde las claves son nombres de acciones
 * y los valores son objetos que contienen una función 'dispatch'.
 */
export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}

// las clases que extiendan de CommunicationService
// tienen que implementar esta interfaz ya que
// esta define los metodos necesarios para tener una comunicacion
// con el renderer process
export interface ICommunicationService extends Service {
  /**
   * Objeto que define las acciones disponibles para el servicio de comunicación.
   * Las acciones se utilizan para comunicarse entre el proceso principal y el proceso de renderizado.
   */
  _actions: ActionMap<any>

  /**
   * Función que envía una acción específica al proceso de renderizado.
   * @param action - La acción que se va a enviar al proceso de renderizado.
   * @returns Una promesa que se resuelve cuando la acción se envía con éxito.
   */
  _dispatcher: <T>(action: Action<T>) => Promise<void>
}
