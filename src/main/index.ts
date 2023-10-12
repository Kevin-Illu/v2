import Application from './src/app'
import { DatabaseService, TodoService } from './src/services'
import { SettingsService } from './src/services/settings/settings-service'

// instance of services
const dbS = new DatabaseService('./src/main/src/database/v2.db')
const stS = new SettingsService(dbS)
const tdS = new TodoService(dbS)

const services = {
  [dbS.name]: dbS,
  [stS.name]: stS,
  [tdS.name]: tdS
}

const app = new Application(services)
app.start()
