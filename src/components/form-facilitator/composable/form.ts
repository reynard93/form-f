import type { Store, StateTree } from 'pinia'
import {  get as objGet, set as objSet } from 'lodash'
import { reactive, computed, type WritableComputedRef, type ComputedRef } from 'vue'
import validationRunner from '../utils/validation'


interface UseFormFaciliatorProps {
    schema: Schema
    store: Store<string, StateTree>
    dependency: Object,
    message?: Object
}
 

export function useFormFaciliator({ store, schema, dependency }: UseFormFaciliatorProps) {

    const validateAll = async () => {
        // const value = objGet(store, key)
        // const fieldSchema = objGet(schema, key) as FieldSchema;
        // const state = store.$state

        // return validationRunner({ fieldSchema, state, value, options: {}, dependency }, true)
    }


    const onBlur = (key: string) => {
        return async () => {
            const value = objGet(store, key) as FieldValue
            const fieldSchema = objGet(schema, key) as FieldSchema;
            const state = store.$state

            const { type, keyword } = await validationRunner({ fieldSchema, state, value, options: {}, dependency })
            
            fieldState(key).value = { errorMsg: "message", inputState: type }
        }
    }

    const show = (key: string): ComputedRef<Boolean> => {
        const fieldSchema = objGet(schema, key) as FieldSchema;

        return computed(() => {
            return fieldSchema.show({ state: store, dependency })
        })
    }

    const vModel = (key: string): WritableComputedRef<any> => {
        return computed({
            get: () => {
                return objGet(store, key) as FieldValue
            },
            set: (value) => {
                objSet(store, key, value)
            }
        })
    }

    const fieldState = (key: string): WritableComputedRef<InputState> => {
        return reactive(computed({
            get: () => {
                return objGet(store._inputState, key) as InputState
            },
            set: ({ inputState, errorMsg }) => {
                const s = objGet(store._inputState, key) as InputState
                s.inputState = inputState
                s.errorMsg = errorMsg
            }
        }))
    }
    
    return { validateAll, show, onBlur, vModel, fieldState }
}
