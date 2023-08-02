import { FieldSchema } from '../../../typings/schema'

/**
 * Validates the provided value based on the current validation rules.
 * @param value
 * @param validations
 */
export async function validateValue(
  value: any,
  validations: FieldSchema['validation'] = {}
): Promise<{
  type: string
  message: string
}> {
  const DEFAULT_TYPE = 'error'
  let type = null
  let message = ''

  for (const [validationName, validation] of Object.entries(validations)) {
    const response = await validation(value) // psb pass in pair for duo validation

    if (typeof response === 'object' && response.result === false) {
      type = response.type ? response.type : DEFAULT_TYPE
      message = response.message
      break
    }
    if (!response) {
      type = DEFAULT_TYPE
      message = validationName
      break
    }
  }
  return {
    type,
    message
  }
}
