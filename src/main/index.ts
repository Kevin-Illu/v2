import Application from './src/app'
import { DatabaseService, TodoService, AuthService } from './src/services'

// instance of services
const dbS = new DatabaseService('./database/v2.db')
const authS = new AuthService(dbS)
const todosS = new TodoService(dbS)

const services = {
  [dbS.name]: dbS,
  [authS.name]: authS,
  [todosS.name]: todosS
}

const app = new Application(services)
app.start()
