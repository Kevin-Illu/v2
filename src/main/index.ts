import Application from './src/app'
import { DatabaseService, TodoService } from './src/services'
import { SettingsService } from './src/services/settings/settings-service'

const db = new DatabaseService('./src/main/src/database/v2.db', 'database')
const settignsService = new SettingsService(db, 'settings')
const todoService = new TodoService(db, 'todo')

const services = {
  [db.name]: db,
  [settignsService.name]: settignsService,
  [todoService.name]: todoService
}

const app = new Application(services)
app.start()
