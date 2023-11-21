import { defineStore } from "pinia";
import {ref} from 'vue'

export const useFormStore = defineStore('form', () => {
  // maybe can inject specific object helpful for the form created with some helpers from ff
  const text = ref('default')
  // also reequrie ther name of the action to be specific
  // can i use the const form of ? i dont think so i need to use functions
  function setText(newText) {
    text.value = newText
  }
  // i just do the wrapping myself here for conveninece
  return { text, actions: {setText }}
})
