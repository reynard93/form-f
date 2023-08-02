<template>
  <div>
    <slot v-if="store" :validateForm="validateForm"></slot>
  </div>
</template>

<script setup lang="ts">
// this sets up the store used by the form by calling useFormStore which calls createFormStore
// job is to expose out the store after it is created and provide the validateForm function to validate entire form
import { GroupSchema } from '../../../typings/schema'
import useFormStore from '../../composable/useFormStore'

type Props = {
  schema: GroupSchema
  // TODO: add dependency
}
const { schema } = defineProps<Props>()
const store = useFormStore({ schema })

// TODO?: clean it up before exposing out through computed
defineExpose({
  store,
  validateForm
})

function validateForm() {
  store.validateForm()
}
</script>
