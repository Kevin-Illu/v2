import { type User } from '$globalTypes/models'
import { type MainDatabaseInstance } from '@main/types'
import { type IRepository } from './IRepository'

export class AuthRepository implements IRepository {
  constructor(public db: MainDatabaseInstance) {}

  public register = async (user: User): Promise<boolean> => {
    const res = await this.db.execute(
      `
    INSERT INTO users (name, email)
    VALUES (?,?)`,
      [user.name, user.email]
    )

    if (res.changes > 0) {
      return true
    }

    return false
  }

  public getUser = async (): Promise<User | null> => {
    const user = await this.db.fetch<User>('SELECT * FROM users WHERE Id = 1')
    return user[0] || null
  }
}
