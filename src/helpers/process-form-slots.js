// recursive function to process slotContent
import { capitalize, computed, h, watch } from 'vue'
import FormInput from '../components/core/FormInput'

function injectProps(slotContent, fieldId, add, remove, state, formDispatchers, formValidators, fieldSchema) {
  slotContent.props.add = add
  slotContent.props.remove = remove
  slotContent.props.schema = fieldSchema
  slotContent.props.dispatchers = formDispatchers
  slotContent.props.validators = formValidators
  slotContent.props.state = state
}

function getValidatedOptions(fieldSchema, dependency) {
  if (fieldSchema?.options) {
    return fieldSchema?.options instanceof Function ? fieldSchema.options({ dependency }) : fieldSchema.options
  }
  return undefined
}

// simplify the props here, looks like it is doing too much too, break it down
// props here are props passed to the FF
function processSlotContent(slotContent, props, formDispatchers, formValidators, _formState, formInputRefs) {
  const formState = {
    // for old schema to work, show is accessing the state from .state
    state: _formState
  }
  if (typeof slotContent.children?.default === 'function') {
    // will this affect the FormRepeater?
    const copiedChildren = slotContent.children
      .default({})
      .map(item => processSlotContent(item, props, formDispatchers, formValidators, _formState, formInputRefs))
    slotContent = h(slotContent, { ...slotContent.props }, () => copiedChildren)
  }

  if (slotContent.props && slotContent.props['field-id']) {
    const fieldId = slotContent.props['field-id']
    const fieldHide = computed(() => Boolean(props.schema[fieldId]?.show && !props.schema[fieldId].show(formState)))
    const fieldSchema = props.schema[fieldId]
    const state = _formState[fieldId]

    if (fieldHide.value) return

    if (Array.isArray(state)) {
      // if i am already handling nested here, handle more!
      const add = formDispatchers[`add${capitalize(fieldId)}`]
      const remove = formDispatchers[`remove${capitalize(fieldId)}`]
      if (!add || !remove) {
        console.warn(`Missing add or remove dispatcher for fieldId: ${fieldId}`)
      }
      // inject props looks unnecessary
      injectProps(slotContent, fieldId, add, remove, state, formDispatchers, formValidators, fieldSchema.schema)
      return slotContent // FormRepeater
    }
    const dispatch = formDispatchers[`set${capitalize(fieldId)}`]
    const validate = formValidators[fieldId]
    watch(fieldHide, newVal => {
      if (newVal) {
        // Remove the reference to the FormInput from formInputRefs
        delete formInputRefs.value[fieldId]
      } else {
        dispatch(props.schema[fieldId].defaultValue)
      }
    })
    if (!dispatch || !validate) {
      console.warn(`Missing dispatcher, validator for fieldId: ${fieldId}`)
    }
    // could create a getMaybe function util, use it for data-qa as well
    const maybeOptions = getValidatedOptions(fieldSchema, props.dependency)
      ? { options: getValidatedOptions(fieldSchema, props.dependency) }
      : {}

    return h(
      FormInput,
      {
        ref: el => {
          // prevent null refs that u have to check for when validateAll
          if (el) {
            formInputRefs.value[fieldId] = el
          }
        },
        messages: props.messages,
        ...slotContent.props,
        fieldId,
        state,
        dispatch,
        validate,
        ...maybeOptions
      },
      () => [slotContent]
    )
  }

  return slotContent
}

export default processSlotContent
