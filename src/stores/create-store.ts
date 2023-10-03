import { StoreProps } from '../../typings/store'
import { MissingStorePropsError } from '../utils/store-props-error'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { initialiseFormState } from '../utils/init-form-state'
import { createActionsFromProps } from '../utils/create-form-action'

function handleValidation(validators: any) {
  return (newCount: number, oldCount: number) => {
    if (oldCount !== newCount) {
      // run all validations for currently showing fields
      Object.values(validators.value).forEach((validator: any) => {
        if (Array.isArray(validator)) {
          // call inner validators from nested form inside FormList
          validator.forEach((v: () => void) => Object.values(v).forEach(v => v()))
        } else {
          validator()
        }
      })
    }
  }
}

export const createFormStore = (storeProps?: StoreProps) => {
  if (!storeProps) {
    throw new MissingStorePropsError()
  }
  const { schema, dependency } = storeProps

  const formState: Record<string, any> = ref(initialiseFormState(schema))
  const errorStates = ref({})
  const validators = ref({}) // fill it with keys of the fields that are shown

  // using this defineStore way provides a lot more flexibility -> 1) watchers within the store and 2) freely use any composable
  return defineStore('FormStore', () => {
    const actions = createActionsFromProps(schema, formState, errorStates)
    // validateCount only change when 'submit' button is clicked
    watch(
      // when trying to watch a particular property of a reactive object you should wrap it in a function
      () => formState.value.validateCount,
      handleValidation(validators),
      { immediate: false }
    )

    return {
      formState: formState,
      schema: ref(schema),
      dependency: ref(dependency),
      errorStates: ref(errorStates),
      validators,
      ...actions
    }
  })()
}
