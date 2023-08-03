import { ValidationResult } from './validation'

interface FieldSchema {
  defaultValue?: any // if not provided, undefined
  // eslint-disable-next-line no-unused-vars
  show?: (state: any) => boolean
  // eslint-disable-next-line no-unused-vars
  options?: any[] | ((dependency: any[]) => any[]) // applicable only for dropdowns
  validation?: {
    // TODO?: have specific validation event for each validation
    [key: string]: ValidationResult // TODO: constrain rules to be valid rules?, components to be valid components?
  }
}

interface ListFieldSchema {
  // validations could be handy here, idk yet, just keep it minimal for now, if dont use okay
  min: number // havent use yet > TODO
  max: number
  // eslint-disable-next-line no-unused-vars
  show?: (state: any) => boolean
  schema: GroupSchema
}

interface GroupSchema {
  [key: string]: FieldSchema | ListFieldSchema
}
