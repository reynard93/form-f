type RunMode = 'onValidateAll'

interface FieldSchema {
  defaultValue: any,
  show: Function
  options: Function?,
  validation: {
    rules: {
      [key: string]: {
        fn: Function
        runMode: RunMode
      }
    }
  }
}

interface Schema {
  [key: String]: FieldSchema
}
