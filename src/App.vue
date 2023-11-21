<template>
  <main>
    <div class="wrapper">
      <FormFacilitator :schema="schema" :pinia-store="piniaStore">
        <template #default="{ state }">
          {{ state }}
          <mom-input-text field-id="text" />
        </template>
      </FormFacilitator>
    </div>
  </main>

  <div id="overlay" class="portal" />
</template>
<script lang="ts" setup>
import { useFormStore } from './stores/form'
const piniaStore = useFormStore()
const schema = {
  text: {
    defaultValue: 'rah',
    validation: {
      rules: {
        mandatory: v => {
          return {
            result: v ? true : false,
            message: 'mandatory'
          }
        }
      }
    }
  }
}
</script>

<style>
.wrapper,
.wrapper > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 7px 14px;
}

.wrapper * {
  margin: auto;
}
</style>
