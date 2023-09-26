import { ElectronAPI } from '@electron-toolkit/preload'
import api from './src/api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
