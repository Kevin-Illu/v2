export interface Service {
  /**
   * Un identificador único para el servicio.
   * Se utiliza para buscar servicios por nombre o identificar el servicio.
   */
  name: string

  /*
   * Aqui se ejecutan procesos necesarios para que
   * funcione algun servicio y algunos procesos que el
   * servicio necesite para funcionar
   */
  initialize: (args?: any) => void


  /*
   * Algunos servicios necesitan ejecutar
   * funciones que cierren procesos abiertos cuando
   * ya no se necesita este servicio
   */
  cleanup: (args?: any) => void
}
