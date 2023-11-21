import { h, defineComponent, ref } from 'vue'
import {
  createFormDispatchers,
  createFormState,
  getFormValidator
} from '../../helpers/initialise-form'
import processSlotContent from '../../helpers/process-form-slots'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'FormFacilitator',
  props: {
    schema: {
      type: Object,
      required: true
    },
    dependency: {
      type: Object
    },
    messages: {
      type: Object
    },
    piniaStore: {
      type: Object // either pinia or vuex
    }
  },
  setup(props, { slots, expose }) {
    // currently support composition api first, but this ccomes with complexity in getting actions
    let formState, formDispatchers
    // TODO: provide manual mode, pass in formState, dispatchers, manually
    // if pass dispatchers need to name them in a specific form
    const formValidators = getFormValidator(props.schema)
    if (props.piniaStore) {
      formState = storeToRefs(props.piniaStore)
      // use interface to ensure pinia store has actions property, give appropriate warning
      formDispatchers = props.piniaStore.actions
    } else {
      formState = createFormState(props.schema)
      formDispatchers = createFormDispatchers(formState, props.schema)
    }
    const formInputRefs = ref({})

    // do i have the ref for repeat? if so inside of validateAll if it is repeat i call its validateAll
    expose({
      // TODO: alternative to get state, dispatchers ,validators by ref instead of scoped slots
      validateAll: async () => {
        const results = await Promise.all(
          Object.values(formInputRefs.value).map(async inputRef => {
            // get inputRef value
            return inputRef && (await inputRef.modelValidate(inputRef.vModel))
          })
        )
        // TODO: handle nested
        return results.every(result => result)
      }
    })
    return () => {
      return h(
        'div',
        {},
        slots
          .default({ state: formState, dispatchers: formDispatchers, validators: formValidators })
          .map(slotContent => {
            return processSlotContent(
              slotContent,
              props,
              formDispatchers,
              formValidators,
              formState,
              formInputRefs
            )
          })
      )
    }
  }
})
