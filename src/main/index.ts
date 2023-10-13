import { AuthService } from '@main/services/auth'
import Application from './src/app'
import { DatabaseService, TodoService } from './src/services'

// instance of services
const dbS = new DatabaseService('./src/main/src/database/v2.db')
const authS = new AuthService(dbS)
const todosS = new TodoService(dbS)

const services = {
  [dbS.name]: dbS,
  [authS.name]: authS,
  [todosS.name]: todosS
}

const app = new Application(services)
app.start()
