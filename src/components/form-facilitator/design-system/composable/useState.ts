import { get as objGet, set as objSet } from 'lodash'
import { computed, type WritableComputedRef } from 'vue'
import type { Store, StateTree } from 'pinia' 


export const useState = (store: Store<string, StateTree>, fieldId: string) => {
    const fieldInputState = computed({
        get: () => {
            return objGet(store._inputState, fieldId)
        },
        set: ({ inputState, errorMsg }) => {
            const s = objGet(store._inputState, fieldId)
            s.inputState = inputState
            s.errorMsg = errorMsg
        },
    })

    const fieldState = computed({
        get: () => {
            return objGet(store, fieldId)
        },
        set: (value) => {
            objSet(store, fieldId, value)
        }
    })

    const resetState = (defaultValue: any) => {
        fieldInputState.value = { errorMsg: "", inputState: null }
        fieldState.value = defaultValue
    }

    return {
        fieldInputState,
        fieldState,
        resetState
    }
}

