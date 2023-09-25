import { join } from 'path'
import { app, shell, BrowserWindow } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png'
import Database from './database/db'

class Application {
  private app: Electron.App
  private db: Database

  constructor(db: Database) {
    this.app = app
    this.db = db
    this.app.on('activate', this.handleActivate)

    // on close window
    this.app.on('window-all-closed', () => {
      this.db.connectionManager.close()
      this.app.quit()
    })
  }

  public start(): void {
    this.app.whenReady().then(this.handleReady)
  }

  private createMainWindow = (): void => {
    const mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  private handleActivate = (): void => {
    const mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow === null) {
      this.createMainWindow()
    }
  }

  public handleReady = (): void => {
    this.app.whenReady().then(() => {
      electronApp.setAppUserModelId('com.electron')

      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      this.createMainWindow()

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) this.createMainWindow()
      })
    })
  }

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.

  // TODO: "implement this method when the the application is executed in macOS"
}

export default Application
