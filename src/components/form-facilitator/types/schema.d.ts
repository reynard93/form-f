interface Schema {
  [key: String]: {
    defaultValue: any,
    show: Function
    validation: {
      rules: {
        [key: string]: {
          fn: Function
          runMode: String
        }
      }
    }
  }
}

interface FieldSchema {
  defaultValue: any,
  show: Function
  validation: {
    rules: {
      [key: string]: {
        fn: Function
        runMode: String
      }
    }
  }
}
