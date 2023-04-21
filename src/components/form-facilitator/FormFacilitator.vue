<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide, defineExpose, type PropType } from 'vue'
import type { StoreDefinition } from 'pinia'
import { get as objGet } from 'lodash'

interface NodeRef{
  validate:Function
}

const props = defineProps({
  schema: {
    type: Object
  },
  store: {
    type: Function as PropType<StoreDefinition>,
    default: () => {}
  },
  messages: {
    type: Object,
    default: () => {}
  },
  dependency: {
    type: Object,
    default: () => {}
  }
})


const childNodes = new Map<String, NodeRef>();

const validateAll = () => {
  for (let [key, nodeRef] of childNodes) {
    nodeRef.validate(true)
  }
}

provide('store', props.store)
provide('getSchema', (id: string) => {
  return objGet(props.schema, id)
})
provide('getMessage', (key: string) => {
  return objGet(props.messages, key)
})
provide('dependency', props.dependency)

provide('onLoad', (nodeRef: NodeRef, fieldId: string) => {
  return childNodes.set(fieldId, nodeRef)

})

provide('onDestroy', (fieldId: string) => {
  childNodes.delete(fieldId)
})

defineExpose({
  validateAll
})
</script>
