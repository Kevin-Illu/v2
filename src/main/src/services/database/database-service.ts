import { Service } from '@main/types'
import { PrismaClient } from '@prisma/client'

export class DatabaseService implements Service {
  name: string = 'Database'
  db = new PrismaClient()

  public connnect = (): void => {
    this.db.$connect()
  }

  public disconect = (): void => {
    this.db.$disconnect()
  }

  initialize = (): void => this.connnect()
  cleanup = (): void => this.disconect()
}
