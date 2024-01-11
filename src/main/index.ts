import Application from './src/app'

import { TodoService } from './src/services/todo'
import { DatabaseService } from './src/services/database'

// instance of services
const dbService = new DatabaseService('./database/v2.db')
const todosService = new TodoService(dbService)

const services = {
  [dbService.name]: dbService,
  [todosService.name]: todosService
}

const app = new Application(services)
app.start()
