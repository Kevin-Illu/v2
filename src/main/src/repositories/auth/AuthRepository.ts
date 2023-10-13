import { MainDatabaseInstance } from '@main/types'
import { IRepository } from './IRepository'

export class AuthRepository implements IRepository {
  constructor(public db: MainDatabaseInstance) {}

  public authenticate = async (user: any): Promise<boolean> => {
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

  public isAuthenticated = async (): Promise<boolean> => {
    const isAuth = await this.db.fetch<number>('SELECT COUNT(*) FROM users')[0]
    return !!isAuth
  }
}
