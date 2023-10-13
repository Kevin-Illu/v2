import { MainDatabaseInstance } from '@main/types'
import { IRepository } from './IRepository'

export class SettingsRepository implements IRepository {
  constructor(private db: MainDatabaseInstance) {}

  isLogged = async (): Promise<boolean> => {
    const users = await this.db.fetch<number>('SELECT COUNT(*) FROM users')[0]
    console.log(users, typeof users)
    return !!users
  }
}
