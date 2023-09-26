import TodoService from './src/services/todoService'
import Application from './src/app'
import Database from './src/database/db'

const db = new Database('./v2.db')

const todoService = new TodoService(db)

const services = {
  todoService
}

const app = new Application(db, services)
app.start()
