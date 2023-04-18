<template>
  <mom-input-text v-bind="$attrs" :input-state="state.inputState" :value="value"  @input="onInput" />
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'
import type { StoreDefinition } from 'pinia'

import { get as objGet, set as objSet } from 'lodash'
 

const store = inject('store') as StoreDefinition
const fieldId = inject('fieldId') as string
const options = inject('options') as Object
const dependency = inject('dependency') as Object
const schema = (inject('getSchema') as Function)(fieldId)

const state = objGet(store()._inputState, fieldId)
const value = computed(() => objGet(store(), fieldId))

 

const validate = async (runAllRules = false) => {
  if (!(schema && schema.validation && schema.validation.rules)) return true

  const validationRules = schema.validation.rules

  for (const validationName in validationRules) {
    const validation = validationRules[validationName]
    let response
    if (typeof validation === "function") {
       response = await validation(value, {
        state: state,
        options: options,
        dependency: dependency
      })  
    }
    else if(typeof validation === "object" && validation.runMode){
      if (runAllRules && validation.runMode.include('onValidateAll')) {
        const method = validation.function
        response = await method(value, {
          state: state,
          options: options,
          dependency: dependency
        })
      }
    }
  }
 }

onMounted(() => { 
   (inject('onLoad') as Function)({ validate }, fieldId)
})




const onInput = (value: string) => { 
  objSet(store(), fieldId, value)
}



defineExpose({
  validate
})
</script>
