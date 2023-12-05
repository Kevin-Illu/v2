import { DatabaseService } from '../src/services/database'

const DataBase = new DatabaseService('./database/test.ts')
DataBase.initialize()

export { DataBase }
