interface ServiceStructure {
  name: string
  actions: {
    [key: string]: {
      dispatch: any
    }
  }
}
