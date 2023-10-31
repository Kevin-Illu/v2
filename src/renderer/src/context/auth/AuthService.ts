import { User } from '$globalTypes/models'

// Acceso a la funcionalidad de autenticacion
// del main process
const AuthService = window.api.auth

/**
 * Función asincrónica que obtiene la información principal del usuario.
 *
 * @returns {Promise<User | null>} La información del usuario o null si no se encuentra.
 */
export async function getUserInformation(): Promise<User | null> {
  return await AuthService.dataAccessor<User | null>({ type: 'get-user' })
}

/**
 * Función asincrónica que verifica el registro del usuario.
 *
 * @param {User} user - El usuario que se va a registrar.
 * @returns {Promise<boolean>} Verdadero si el registro se realizó con éxito, de lo contrario, falso.
 */
export async function verifyUserRegistration(user: User): Promise<boolean> {
  return await AuthService.dataAccessor<boolean>({
    type: 'register-user',
    payload: user
  })
}
