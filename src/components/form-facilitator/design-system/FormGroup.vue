<template>
  <mom-form-group
    v-bind="$attrs"
    :input-state="fieldInputState.inputState"
    :message-text="fieldInputState.errorMsg"
  >
    <slot></slot>
  </mom-form-group>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue'
import type { StoreDefinition } from 'pinia'
import { useState } from './composable/useState'

const props = defineProps({
  fieldId: {
    type: String,
    default: ''
  }
})
const store = (inject('store') as StoreDefinition)()
const { fieldInputState } = useState({ store, fieldId: props.fieldId })

const validate = () => {}

provide('fieldId', props.fieldId)
provide('options', {})

defineExpose({
  validate
})
</script>
