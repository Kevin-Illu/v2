import Application from './src/app'

import { AuthService } from './src/services/auth'
import { TodoService } from './src/services/todo'
import { DatabaseService } from './src/services/database'

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
