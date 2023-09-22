import { ipcRenderer } from 'electron'

class Renderer {

}

class Bridge {
  public renderer: Renderer

  constructor(re: Renderer) {
    this.renderer = re
  }
}

export default Bridge
