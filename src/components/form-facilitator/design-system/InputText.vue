<template>
  <mom-input-text v-if="show" v-bind="$attrs" :input-state="fieldState.inputState" :value="value" @input="onInput" @blur="onBlur" />
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onBeforeMount } from 'vue'
import type { StoreDefinition } from 'pinia'
import { get as objGet, set as objSet } from 'lodash'
import { useValidate } from './composable/useValidation'
 

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

const fieldState = computed({
  get: () => { 
    return objGet(store._inputState, fieldId)
  },
  set: ({ inputState, errorMsg }) => {
    const s = objGet(store._inputState, fieldId)
    s.inputState = inputState
    s.errorMsg = errorMsg
  },
})

const value = computed(() => objGet(store, fieldId))

const validate = async () => {
  if (schema?.validation?.rules) {
    const { type, keyword } = await useValidate({ schema, options, dependency, value, state: store })
     
    const message: String = getMessage(keyword) 
    fieldState.value = { errorMsg: message, inputState : type }
  }
}

const show = computed(() => {
  return schema.show ? schema.show({ state: store, dependency: dependency }) : true
})

onMounted(() => {
  onLoad({ validate }, fieldId)

  if (props.validateOnLoad) {
    validate()
  }
})

onBeforeMount(() => {
  onDestroy(fieldId)
})

const onInput =  (value: string) => {
  objSet(store, fieldId, value)
  
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
