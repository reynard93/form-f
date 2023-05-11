<template>
    <mom-input-date />
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

const props = defineProps({
    validateOnLoad: {
        type: Boolean,
        default: false
    },
    fieldId: {
        type: String
    }
})

</script>
