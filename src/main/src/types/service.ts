export interface Service {
  /**
   * Un identificador único para el servicio.
   * Se utiliza para buscar servicios por nombre o identificar el servicio.
   */
  name: string

  // TODO: mejorar el rotorno de funciones
  // o denifir un tipo de retorno

  initialize: (args?: any) => void
  cleanup: (args?: any) => void
}
