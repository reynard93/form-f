<template>
  <mom-description-item :details="fieldState" v-bind="$attrs">    <!-- Pass on all named slots -->
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot"/>
  </mom-description-item>
</template>
<script setup lang="ts">
// ignore this component for now, there is extra requirement that it can read from the store too
const props = defineProps({
  fieldState: {
    type: Object,
    required: true
  }
})

</script>
