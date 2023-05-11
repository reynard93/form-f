import type { ComputedRef } from 'vue'
import type { Store, StateTree } from 'pinia'
import type { StateValue } from './useState'

interface UseValidationReturn {
  valid: Boolean
  type: String
  keyword: String
}

interface UseValidateProps {
  schema: Schema
  state: Store<string, StateTree>
  options: Object
  dependency: Object
  value: StateValue
}

export const useValidate = async (
  { schema, state, options, dependency, value }: UseValidateProps,
  runAllRules = false
): Promise<UseValidationReturn> => {
  const DEFAULT_TYPE = 'error'
  const validationRules = schema.validation.rules

  for (const validationName in validationRules) {
    const validation = validationRules[validationName]

    if (!runAllRules && validation.runMode === 'onValidateAll') {
      continue
    }

    //Support older version
    const v1Schema = typeof validation === 'function'
    const method = v1Schema ? validation : validation.fn

    const response = await method(value, {
      state: state,
      options: options,
      dependency: dependency
    })

    if (typeof response === 'object' && response.result === false) {
      return {
        valid: response.result,
        type: response.type ? response.type : DEFAULT_TYPE,
        keyword: validationName
      }
    }

    if (!response) {
      return {
        valid: false,
        type: DEFAULT_TYPE,
        keyword: validationName
      }
    }
  }

  return {
    valid: true,
    type: '',
    keyword: ''
  }
}
