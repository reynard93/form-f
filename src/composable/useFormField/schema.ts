import { FieldSchema } from '../../../typings/schema'
import { ListAttributes } from '../useFormField'

/**
 * Returns field schema based on the given parameters
 * @param listAttributes
 * @param formStore
 * @param fieldId
 */
export function getSchema(
  formStore: any,
  fieldId: string,
  listAttributes?: ListAttributes | undefined
): FieldSchema {
  if (listAttributes && typeof listAttributes?.index === 'number') {
    return formStore.schema[listAttributes.listId].schema[fieldId]
  }
  return formStore.schema[fieldId]
}
