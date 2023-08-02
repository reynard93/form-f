import { capitalize, computed, onBeforeMount, reactive, Ref, ref, watch } from 'vue'
import useFormStore from './useFormStore'
import { ErrorState } from '../../typings/error-state'
import { getSchema } from './useFormField/schema'
import { getOptions } from './useFormField/options'
import { validateValue } from './useFormField/validation'
import { ReactiveVariable } from 'vue/macros'
import { DynamicListeners } from '@typings/listener'
import { isObjTruthy } from '../utils/object-utils'

export interface ListAttributes {
  index: number
  listId: string
}

export type FieldStateAndHandlers = ReturnType<typeof useFormField>

export function useFormField({
  fieldId,
  listAttributes
}: {
  fieldId: string
  listAttributes?: ListAttributes
}) {
  const formStore = useFormStore()
  const {
    show: showFn = () => true,
    validation: validations = {},
    options = [],
    defaultValue = null
  } = getSchema(formStore, fieldId, listAttributes)

  // Define internal states
  const { errorStates, formState, validators } = formStore
  const _formState = () => {
    // pass listAttributes to show
    if (listAttributes) {
      const { listId, index } = listAttributes
      return formState[listId][index]
    }
    return formState
  }
  const show = computed(() => (_formState() ? showFn(_formState()) : false))
  const fieldOptions: Ref<
    {
      value: string
      label: string
    }[]
  > = ref([])

  const dispatch = (payload?: any) => {
    formStore[`set${capitalize(fieldId)}`](payload, listAttributes)
  }
  const modelValue = () => {
    return _formState()[fieldId]
  }

  const errorState: ReactiveVariable<Partial<ErrorState>> = reactive<Partial<ErrorState>>({
    errorState: null,
    errorMsg: ''
  })

  function resetErrorState() {
    errorState.errorState = null
    errorState.errorMsg = ''
  }

  function resetValue() {
    dispatch(defaultValue)
  }

  function reset() {
    resetErrorState()
    resetValue()
  }

  const vModel = computed({
    get() {
      return modelValue()
    },
    set(newValue) {
      dispatch(newValue)
    }
  })

  async function validate() {
    const { type, message } = await validateValue(vModel.value, validations)
    errorState.errorState = type
    errorState.errorMsg = message
  }

  onBeforeMount(async () => {
    if (options) {
      await getOptions(options, formState, fieldOptions)
    }
  })

  watch(
    show,
    (newShow: boolean) => {
      if (newShow) {
        // i don't want to pass in the validate here because i want it to be extended with emit
        // will be subsequently passed from createInputComponent when component is shown
        if (listAttributes) {
          const { listId, index } = listAttributes
          errorStates[listId][index][fieldId] = errorState
          validators[listId][index] = {
            [fieldId]: {}
          }
        } else {
          errorStates[fieldId] = errorState
          validators[fieldId] = {}
        }
      } else {
        if (listAttributes) {
          const { listId, index } = listAttributes

          if (isObjTruthy(errorStates, 'listId', 'index', 'fieldId')) {
            delete errorStates[listId][index][fieldId]
          }

          delete validators[listId][index][fieldId]
        } else {
          delete errorStates[fieldId]
          delete validators[fieldId]
        }
        // if need: check that the formState exists first before resetting
        // reset() // also error with trying to dispatch when it doesn't exist for nested
      }
    },
    { immediate: true }
  )

  const dynamicListeners: DynamicListeners = {
    onBlur: () => {
      dispatch(vModel.value)
    },
    onChange: () => {
      dispatch(vModel.value)
    }
  }

  return {
    show,
    dispatch,
    validate,
    reset,
    vModel,
    errorState,
    options: fieldOptions,
    dynamicListeners
  }
}
