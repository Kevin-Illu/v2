import { join } from 'path'
import { app, shell, BrowserWindow } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import { Service } from '@main/types'
import { DatabaseService } from './services'

// import icon from '../../../resources/icon.png'

class Application {
  private app: Electron.App
  public services: Record<string, Service>

  constructor(services: Record<string, Service>) {
    this.app = app
    this.app.on('activate', this.handleActivate)
    this.services = services
  }

  public start(): void {
    this.app.whenReady().then(() => {
      this.handleReady()
      // services should be initialized before initialization
      this.initializeServices()
      this.handleWindowAllClosed()
    })
  }

  private initializeServices(): void {
    Object.values(this.services).forEach((service) => {
      service.initialize()
    })
  }

  private cleanupServices(): void {
    Object.values(this.services).forEach((service) => {
      service.cleanup()
    })
  }

  private handleWindowAllClosed(): void {
    this.app.on('window-all-closed', () => {
      this.cleanupServices()
      this.app.quit()
    })
  }

  private createMainWindow = (): void => {
    const mainWindow = new BrowserWindow({
      width: 900,
      minWidth: 800,
      height: 670,
      minHeight: 600,
      show: false,
      autoHideMenuBar: true,
      // ...(process.platform === 'linux' ? { icon } : {}),
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
}

export default Application
