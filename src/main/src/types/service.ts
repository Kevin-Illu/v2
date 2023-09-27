export interface Service {
  /**
   * Un identificador único para el servicio.
   * Se utiliza para buscar servicios por nombre o identificar el servicio.
   */
  name: string

  // TODO: mejorar el rotorno de funciones
  // o denifir un tipo de retorno

  /**
   * Inicializa el servicio.
   * Puede realizarse configuraciones iniciales o establecer conexiones a recursos necesarios.
   * @returns Una promesa que se resuelve cuando la inicialización se completa.
   */
  initialize: (args?: any) => void

  /**
   * Realiza tareas de limpieza y liberación de recursos cuando el servicio ya no es necesario.
   * @returns Una promesa que se resuelve cuando la limpieza se completa.
   */
  cleanup: (args?: any) => void
}
