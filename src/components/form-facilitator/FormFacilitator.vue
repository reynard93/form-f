<template >
  <slot name="form-facilitator"></slot>
</template>

<script setup lang="ts">
import { provide, defineExpose, type PropType, inject, type ComputedRef, useSlots, onMounted, ref, type VNode } from 'vue'
import type { StoreDefinition } from 'pinia'
import { get as objGet } from 'lodash'
import type { InputState } from './types/input-state'


const form = ref(null);

interface NodeRef {
  validate: () => Promise<InputState>
  show: ComputedRef<Boolean>
}

interface FormFacilitorExpose {
  validateAll: Function
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

const validateChildComponents = null;

onMounted(() => {
 
 
})
 

const childNodes = new Map<String, NodeRef>()
 
const validateAll = async (validateChildForm = true) => {
  const validationRes: Array<Promise<InputState>> = new Array()
  for (let [_, nodeRef] of childNodes) {
    if (!nodeRef.show) continue

    validationRes.push(nodeRef.validate())
  }

  const isValidated = (await Promise.all(validationRes)).some(fieldState => fieldState.inputState !== 'error')
  
  

  // return parentFormFacilitatorInstance && !validateChildForm ? await parentFormFacilitatorInstance.validateAll() && isValidated : isValidated
}

const validateField = (fieldId: string, setInputState: Boolean = false) => {
  const node = childNodes.get(fieldId)
  if (node) {
    return node.validate()
  }
}


provide('store', props.store)
provide('dependency', props.dependency)
provide('getSchema', (id: string) => objGet(props.schema, id))
provide('getMessage', (key: string) => objGet(props.messages, key))
provide('onDestroy', (fieldId: string) => childNodes.delete(fieldId))
provide('onLoad', (nodeRef: NodeRef, fieldId: string) => childNodes.set(fieldId, nodeRef))
provide('formfacilitator', {
  validateAll
})
provide('childForms',
  {
    bind: () => { },
    unbind: () => { }
})

defineExpose({
  validateAll,
  validateField 
})
</script>
