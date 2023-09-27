import TodoService from './src/services/todo/todoService'
import Application from './src/app'
import { DatabaseService } from './src/services/database'

const db = new DatabaseService('./src/main/src/database/db/v2.db', 'database')
const todoService = new TodoService(db, 'todo')

const services = {
  [db.name]: db,
  [todoService.name]: todoService
}

const app = new Application(services)
app.start()
