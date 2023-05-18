type RunMode = string

export interface FieldSchema {
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
  [key: String]: {
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
}
