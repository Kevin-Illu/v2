import { type User } from '$globalTypes/models'
import { type MainDatabaseInstance } from '@main/types'
import { type IRepository } from './IRepository'

export class AuthRepository implements IRepository {
  constructor(public db: MainDatabaseInstance) {}

  public register = async (user: User): Promise<boolean> => {
    console.log('register new user')

    const res = await this.db.execute(
      `INSERT INTO user (name, email)
       VALUES (?,?)`,
      [user.name, user.email]
    )

    if (res.changes > 0) {
      this.db.execute(
        `
        UPDATE global_config
        SET value = ?
        WHERE key = 'main_user_id'
        `,
        [1]
      )

      console.log('registration was successfully')

      return true
    }

    console.log('registration failed')
    return false
  }

  /*
   * return the user if exist otherways return null
   */
  public getUser = async (): Promise<User | null> => {
    return this.db
      .fetch<User>('SELECT * FROM user WHERE Id = 1')
      .then((user) => {
        return user[0]
      })
      .catch(() => null)
  }
}
