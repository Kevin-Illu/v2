import { ElectronAPI } from '@electron-toolkit/preload'
import { APIService } from './src/api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: APIService
  }
}
