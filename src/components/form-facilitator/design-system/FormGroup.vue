<template>
  <mom-form-group v-bind="$attrs" :input-state="state.inputState" :message-text="state.errorMsg">
    <slot></slot>
  </mom-form-group>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue'
import type { StoreDefinition } from 'pinia'
import { get as objGet } from 'lodash'

const props = defineProps({
  fieldId: {
    type: String,
    default: ''
  }
})
const store = inject('store') as StoreDefinition
const state = objGet(store()._inputState, props.fieldId) 

const validate = () => {}

defineExpose({
    validate
})
provide('fieldId', props.fieldId)
provide('options', {})
</script>
