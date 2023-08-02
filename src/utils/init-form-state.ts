import { isFieldSchema } from '../utils/schema-guard'
import { GroupSchema } from '@typings/schema'

export function initialiseFormState(schema: GroupSchema) {
  const formState: Record<string, any> = {}
  Object.keys(schema).forEach(key => {
    const _schema = schema[key]
    formState[key] = isFieldSchema(_schema) ? _schema.defaultValue : []
  })
  formState.validateCount = 0
  return formState
}
