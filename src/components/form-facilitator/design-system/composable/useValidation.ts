import type { ComputedRef } from "vue"
enum errorType {
    error = "error",
    warning = "warning"
}

interface Schema {
    validation: {
        rules: {
            [key: string]: {
                fn: Function
                runMode: String
            }
        }
    }
}

interface ValidationReturnType{
    valid : Boolean,
    type: String,
    keyword: String
}

interface UseValidateProps {
    schema: Schema,
    state: Object,
    options: Object,
    dependency: Object,
    value: ComputedRef<any>
}

export const useValidate = async ({ schema, state, options, dependency, value }: UseValidateProps, runAllRules = false): Promise<ValidationReturnType> => {
    const DEFAULT_TYPE = 'error'
    const validationRules = schema.validation.rules

    for (const validationName in validationRules) { 
        const validation = validationRules[validationName]

        if (!runAllRules && validation.runMode === 'onValidateAll') {
            continue
        }

        const method = validation.fn
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
        type: "",
        keyword: ""
    }
}
