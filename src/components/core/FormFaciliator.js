import { h, defineComponent, ref } from 'vue'
import initialiseForm from '../../helpers/initialise-form'
import processSlotContent from '../../helpers/process-form-slots'

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
    }
  },
  setup(props, { slots, expose }) {
    const { formState, formDispatchers, formValidators } = initialiseForm(props.schema)
    const formInputRefs = ref({})

    expose({
      validateAll: async () => {
        const results = await Promise.all(
            Object.values(formInputRefs.value).map(async inputRef => {
              return inputRef && (await inputRef.modelValidate())
            })
        )
        return results.every(result => result)
      }
    })
    return () => {
      return h(
          'div',
          {},
          slots.default().map(slotContent => {
            return processSlotContent(slotContent, props, formDispatchers, formValidators, formState, formInputRefs)
          })
      )
    }
  }
})
