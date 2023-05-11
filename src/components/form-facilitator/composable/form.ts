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

    const validateAll = async (key: string) => {
        const value = objGet(store, key)
        const fieldSchema = objGet(schema, key) as FieldSchema;
        const state = store.$state

        return validationRunner({ fieldSchema, state, value, options: {}, dependency }, true)
    }

    const validate = async (key: string) => {
        const value = objGet(store, key)
        const fieldSchema = objGet(schema, key) as FieldSchema;
        const state = store.$state

        return validationRunner({fieldSchema, state, value, options:{}, dependency})
    }

    const onBlur = (key: string) => {
        return async () => {
            const { type, keyword } = await validate(key)
            
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
                return objGet(store, key)
            },
            set: (value) => {
                objSet(store, key, value)
            }
        })
    }

    const fieldState = (key: string): WritableComputedRef<any> => {
        return reactive(computed({
            get: () => {
                return objGet(store._inputState, key)
            },
            set: ({ inputState, errorMsg }) => {
                const s = objGet(store._inputState, key)
                s.inputState = inputState
                s.errorMsg = errorMsg
            }
        }))
    }
    
    return { validateAll, validate, show, onBlur, vModel, fieldState }
}
