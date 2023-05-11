
import type { Store, StateTree, StoreDefinition } from 'pinia'

interface props {
    fieldSchema: FieldSchema
    state: StateTree
    options: Object,
    value: FieldValue,
    dependency: Object
}
export default async ({ fieldSchema, value, state, dependency, options }: props, runAllRules = false) => {
    const DEFAULT_TYPE = 'error'
    const validationRules = fieldSchema.validation.rules

    for (const validationName in validationRules) {
        const validation = validationRules[validationName]

        if (!runAllRules && validation.runMode === 'onValidateAll') {
            continue
        }

        //Support older version
        const v1Schema = typeof validation === 'function'
        const method = v1Schema ? validation : validation.fn

        const response = await method(value, {
            state,
            dependency
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
