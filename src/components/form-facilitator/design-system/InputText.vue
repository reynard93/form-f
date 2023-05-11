<template>
  <mom-input-text
    v-if="show"
    v-bind="$attrs"
    :input-state="fieldInputState.inputState"
    :value="fieldState"
    @input="onInput"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeMount } from 'vue'
import type { StoreDefinition } from 'pinia'
import { useValidate } from './composable/useValidation'
import { useState } from './composable/useState'
import { useShow } from './composable/useShow'
import type { InputState } from '../types/input-state'

const store = (inject('store') as StoreDefinition)()
const fieldId = inject('fieldId') as string
const options = inject('options') as Object
const dependency = inject('dependency') as Object
const schema = (inject('getSchema') as Function)(fieldId)
const getMessage = inject('getMessage') as Function
const onLoad = inject('onLoad') as Function
const onDestroy = inject('onDestroy') as Function

const emit = defineEmits(['blur', 'input', 'validated'])

const props = defineProps({
  validateOnLoad: {
    type: Boolean,
    default: false
  }
})

const { fieldInputState, fieldState } = useState({ store, fieldId })
const { show } = useShow({ store, dependency, schema })

onMounted(() => {
  onLoad({ validate, show }, fieldId)

  if (props.validateOnLoad) {
    validate()
  }
})

onBeforeMount(() => {
  onDestroy(fieldId)
})

const validate = async (): Promise<InputState> => {
  let inputState: InputState = { errorMsg: '', inputState: null }
  if (!schema?.validation?.rules) {
    return inputState
  }
    const { type, keyword } = await useValidate({
      schema,
      options,
      dependency,
      value: fieldState.value,
      state: store
    })

    const message: String = getMessage(keyword)
    
    inputState = {errorMsg : message, inputState : type}
    fieldInputState.value = inputState

    return inputState
  
}

const onInput = (value: string) => {
  fieldState.value = value
  emit('input', value)
}

const onBlur = ($events: Event) => {
  emit('blur', $events)
  validate()
  emit('validated')
}

defineExpose({
  validate
})
</script>
