import { Action } from '$globalTypes/comunication'
import { Service } from './service'

// Las interfaces derivadas de ICommunicationService deben tener
// obligatoriamente las siguientes propiedades para comunicarse
// eficazmente entre el proceso principal y el proceso de renderizado.
export interface ICommunicationService extends Service {
  /**
   * Objeto que define las acciones disponibles para el servicio de comunicación.
   * Las acciones se utilizan para comunicarse entre el proceso principal y el proceso de renderizado.
   */
  _actions?: ActionMap<any>

  /**
   * Maneja una acción específica en un canal de comunicación.
   * @param channel - El canal en el que se recibe la acción.
   * @param callback - La función de devolución de llamada que se ejecuta cuando se recibe la acción.
   */
  handleAction?: (channel: string, callback: (args?: any) => void) => void

  /**
   * Función que envía una acción específica al proceso de renderizado.
   * @param action - La acción que se va a enviar al proceso de renderizado.
   * @returns Una promesa que se resuelve cuando la acción se envía con éxito.
   */
  _dispatcher?: (action: Action) => Promise<void>
}

/**
 * Representa la estructura de un objeto que contiene una función 'dispatch'
 * que puede tomar argumentos opcionales y devuelve algún resultado.
 */

/**
 * Representa un mapa de acciones donde las claves son nombres de acciones
 * y los valores son objetos que contienen una función 'dispatch'.
 */
export type ActionMap<T> = {
  [K in keyof T]: {
    dispatch: T[K]
  }
}
