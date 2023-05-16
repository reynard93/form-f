
/**
 * defaultValue: any,
    show: Function
    options: Function?,
    validation: {
      rules: {
        [key: string]: {
          fn: Function
          runMode: String
        }
      }
    }
 */
interface FieldSchema {
  defaultValue: any,
  show: Function
  options: Function?,
  validation: {
    rules: {
      [key: string]: {
        fn: Function
        runMode: String
      }
    }
  }
}

interface Schema {
  [key: String]: FieldSchema
}
