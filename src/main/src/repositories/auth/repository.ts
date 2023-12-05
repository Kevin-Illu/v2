import { MainDatabaseInstance } from '@main/types'
import { User } from '$globalTypes/databaseResponse'

export interface IRepository {
  register(user: any): Promise<boolean>
  getUser(id: number): Promise<User | null>
}

export class AuthRepository implements IRepository {
  constructor(public db: MainDatabaseInstance) {}

  public register = async (user: Partial<User>): Promise<boolean> => {
    console.log('registering new user')

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

      console.log('registration successfully')

      return true
    }

    console.log('registration failed')
    return false
  }

  /*
   * return the user if exist otherways return null
   */
  public getUser = async (id: number): Promise<User | null> => {
    return this.db
      .fetch<User>('SELECT * FROM user WHERE Id = ?', [id])
      .then((result: User[]) => {
        return result[0]
      })
      .catch(() => null)
  }
}
