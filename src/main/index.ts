import Application from './src/app'
import Database from './src/database/db'

const db = new Database('./v2.db')
const app = new Application(db)
app.start()
