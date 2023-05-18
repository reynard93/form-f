import type { Store, StateTree } from 'pinia'
import {  get as objGet, set as objSet } from 'lodash'
import { ref, reactive, computed, type WritableComputedRef, type ComputedRef, onMounted } from 'vue'
import validationRunner from '../utils/validation'
import { type InputState } from '../types/input-state'
import { type FieldSchema, type Schema  } from '../types/schema'
interface Messages {
    [fieldId: string]: {
        [keyword: string]: string
    }
}
interface UseFormFaciliatorProps {
    schema: Schema
    store: Store<string, StateTree>
    dependency: Object,
    messages: Object
}
 

export function useFormFaciliator({ store, schema, dependency, messages }: UseFormFaciliatorProps) {
    const state = store.$state
    const options = ref([])


    onMounted(() => {

    })

    
    const validateAll = async () => {}

    const getMessages = (keyword: string, fieldId: string): string => {

        const message = objGet(messages, fieldId + '.' + keyword)

        if (!message) {
            const isExistGlobal = objGet(messages, keyword)
            if (!isExistGlobal) {
                console.error("Cant find the keyword", keyword)
                return "";
            }

            return isExistGlobal
        }

        return message
    }


    const onBlur = (fieldId: string) => {
        return async () => {
            const value = objGet(store, fieldId) as FieldValue
            const fieldSchema = objGet(schema, fieldId) as FieldSchema; 
            
            const { type, keyword } = await validationRunner({ fieldSchema, state, value, options: {}, dependency })
            
            fieldState(fieldId).value = { errorMsg: getMessages(keyword, fieldId), inputState: type }
        }
    }

    const show = (fieldId: string): ComputedRef<Boolean> => {
        const fieldSchema = objGet(schema, fieldId) as FieldSchema;

        return computed(() => {
            const isShow = fieldSchema.show({ state, dependency })
            
            if (isShow) {
                getOptions(fieldId)    
            }
            return isShow
        })
    }

    const vModel = (fieldId: string): WritableComputedRef<any> => {
        return computed({
            get: () => {
                return objGet(state, fieldId) as FieldValue
            },
            set: (value) => {
                objSet(state, fieldId, value)
            }
        })
    }

    const fieldState = (fieldId: string): WritableComputedRef<InputState> => {
        return reactive(computed({
            get: () => {
                return objGet(state._inputState, fieldId) as InputState
            },
            set: ({ inputState, errorMsg }) => {
                const s = objGet(state._inputState, fieldId) as InputState
                s.inputState = inputState
                s.errorMsg = errorMsg
            }
        }))
    }

    const getOptions = async (fieldId: string): Promise<void> =>  {
        const fieldSchema = objGet(schema, fieldId) as FieldSchema;

        options.value = typeof fieldSchema.options == 'function' ? await fieldSchema.options({ state, dependency }) : fieldSchema.options     
    }

    const getAttribute = (fieldId: string) => {
        return reactive({
            vmodel: vModel(fieldId),
            show: show(fieldId),
            blur: onBlur(fieldId),
            fieldState: fieldState(fieldId),
            options: options,
            common: {
                ...fieldState(fieldId),
            }
        })
    }
    
    
    return { validateAll, getAttribute }
}
