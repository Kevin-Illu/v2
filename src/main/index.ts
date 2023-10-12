import Application from './src/app'
import { DatabaseService, TodoService } from './src/services'

// instance of services
const dbS = new DatabaseService('./src/main/src/database/v2.db')
const tdS = new TodoService(dbS)

const services = {
  [dbS.name]: dbS,
  [tdS.name]: tdS
}

const app = new Application(services)
app.start()
