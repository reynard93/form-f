// migrate the error to a separate file under /errors or /utils
class MissingStorePropsError extends Error {
  constructor() {
    super('Required: storeProps')
    this.name = 'MissingStorePropsError'
  }
}

export { MissingStorePropsError }
