import { get as objGet, set as objSet } from 'lodash'
import { computed, type WritableComputedRef } from 'vue'
import type { Store, StateTree } from 'pinia'
import type { InputState } from '../../types/input-state'

interface UseStateProps {
  store: Store<string, StateTree>
  fieldId: string
}

export type StateValue = Object | String | null

interface UseStateReturn {
  fieldInputState: WritableComputedRef<InputState>
  fieldState: WritableComputedRef<StateValue>
  resetState: Function
}

export const useState = ({ store, fieldId }: UseStateProps): UseStateReturn => {
  const fieldInputState: WritableComputedRef<InputState> = computed({
    get: () => {
      return objGet(store._inputState, fieldId)
    },
    set: ({ inputState, errorMsg }) => {
      const s = objGet(store._inputState, fieldId)
      s.inputState = inputState
      s.errorMsg = errorMsg
    }
  })

  const fieldState: WritableComputedRef<StateValue> = computed({
    get: () => {
      return objGet(store, fieldId)
    },
    set: (value) => {
      objSet(store, fieldId, value)
    }
  })

  const resetState = (defaultValue: StateValue): void => {
    fieldInputState.value = { errorMsg: '', inputState: null }
    fieldState.value = defaultValue
  }

  return {
    fieldInputState,
    fieldState,
    resetState
  }
}
