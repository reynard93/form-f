import { h, defineComponent, ref } from 'vue'
import initialiseForm from '@/helpers/initialise-form'
import processSlotContent from '@/helpers/process-form-slots'

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
    state: {
      type: Object // either pinia or vuex
    },
    dispatchers: {
      type: Object
    }
  },
  setup(props, { slots, expose }) {
    // TODO: provide manual mode, pass in formState, dispatchers, manually
    // if pass dispatchers need to name them in a specific form
    const { formState, formDispatchers, formValidators } = initialiseForm(props.schema)
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
