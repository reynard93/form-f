<template>
  <FormFacilitator :schema="baseSchema" #="{ validateForm }" ref="storeRef">
    <InputRadio field-id="radioType" />
    <InputDateMonth field-id="applyDate" />
    <InputDateMonth field-id="applyMonth" />
    <InputEmail field-id="email" />
    <InputNumber field-id="number" />
    <InputSelect field-id="nationality2" />
    <InputCheckboxButton field-id="checkBox" />
    <!--    :validate-on-load="true"-->
    <InputAutoSuggest field-id="nationality" />
    <InputAutoSuggestDynamic
      field-id="institution"
      allow-free-text="always"
      maxlength="100"
      :endpoint="'/api/institutions'"
      @error="() => console.log('happy error')"
    />
    <FormList field-id="repeatedTest">
      <!--      validate-on-submit-->
      <InputText field-id="textType" @validated="() => console.log('validated')" />
      <InputTextArea field-id="textType2" />
    </FormList>
    <mom-button class="m:a m-t:16" @click="validateForm">Submit</mom-button>
  </FormFacilitator>
</template>
<script setup lang="ts">
import baseSchema from './baseSchema'
import { ref } from 'vue'

const storeRef = ref(null)
// through this ref can also expose out validateForm and use outside of the FormFacilitator
</script>
