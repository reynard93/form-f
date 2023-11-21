import { h, defineComponent, computed, reactive, watch } from 'vue'
import { components } from '@momwins/mom-design-system-v3'

export default defineComponent({
  name: 'FormInput', // add possible emits accordingly
  inheritAttrs: true,
  props: {
    label: {
      type: String
    },
    messages: {
      type: Object
    },
    fieldId: {
      type: String
    },
    state: {},
    formState: {},
    validateOn: {
      type: String, // unless explicitly overwritten will follow updateOn
      default: '' // the usual handler but also one extra 'onSubmit', 'onBlur' also valid, TODO
    },
    updateOn: {
      // applies to checkbox button etc very rare components
      type: String,
      default: 'onUpdate:modelValue'
    },
    dispatch: {
      type: Function,
      default: () => {
        // console.log('default dispatch')
      }
    },
    validate: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array
    },
    inputProps: {
      type: Object
    }
  },
  emits: ['dispatch', 'validated'],
  setup(props, { slots, emit, expose }) {
    // isolate props for MomFormGroup
    const formGroupPropsKeys = [
      'label',
      'type',
      'size',
      'inlineInput',
      'labelWidth',
      'tooltip',
      'hintText',
      'messageType',
      'optional',
      'showBullet'
    ]

    const inputState = reactive({
      state: null,
      text: ''
    })

    const resetInputState = () => {
      inputState.state = null
      inputState.text = ''
    }

    // so that when toggle radio button reusing the same formInput next, inputState is reset
    watch(
      () => props.fieldId,
      () => {
        resetInputState()
      }
    )

    // this computed property should be tested
    const validateOn = computed(() => {
      if (props.validateOn === '') {
        // by default if not overwritten will be the same as updateOn
        return props.updateOn
      }
      return props.validateOn
    })
    // change vModel here similar to v3 get should be from the state, computed writable ref
    const vModel = computed({
      get() {
        return props.state.value
      },
      set(value) {
        props.dispatch(value)
        emit('dispatch', value) // i can hook up to when dispatched and do custom things
      }
    })

    const _getErrorMessage = key => {
      const slotId = props.fieldId.split('.').pop()
      const messageKeyPath = props.messages?.[slotId]?.[key]
      return messageKeyPath || ''
    }
    // TODO: move modelValidate and modelUpdate to a separate file to simplify testing

    // Define the event handler outside the render function save memory
    // differentiate if it is triggered from validateAll(no value) use vModel else use the value
    const validate = async (value = vModel.value) => {
      // TODO: throw error via valibot
      for (const [validationName, validation] of Object.entries(props.validate)) {
        const response = await validation(value, props.formState)

        if (!response || (typeof response === 'object' && response.result === false)) {
          inputState.state = response?.type || 'error'
          inputState.text = _getErrorMessage(validationName) || response?.message
          return false
        }
        // if validation is successful reset the input state
        resetInputState()
      }
      return true
    }
    const modelValidate = async (value = vModel.value) => {
      // TODO: throw error via valibot
      const validResult = await validate(value)
      emit('validated', validResult)
      return validResult
    }

    // https://vuejs.org/api/composition-api-setup.html#usage-with-render-functions
    expose({
      validate,
      modelValidate, // maybe make this private
      vModel,
      inputState
    })
    const modelUpdate = async value => {
      // switch on dispatch type only necessary when we have more of these cases, if so abstract it too
      // make a function to return result to endValue if need check for more 'on<type>'
      const endValue = props.updateOn === 'onChange' ? !vModel.value : value
      if (props.updateOn === 'onChange') {
        vModel.value = endValue
      } else {
        vModel.value = endValue
      }
      if (props.validateOn === '') {
        try {
          await modelValidate(endValue)
        } catch (error) {
          console.error(error, 'error')
        }
      }
    }

    return () => {
      const formGroupProps = reactive({})

      // do it here, so props are refreshed
      // i am reusing the same FormInput, which does not update the props
      //  This checks whether incoming props are present before setting
      const restProps = Object.entries(props).reduce((obj, [key, value]) => {
        if (formGroupPropsKeys.includes(key)) {
          formGroupProps[key] = value
        } else {
          obj[key] = value
        }
        return obj
      }, {})

      const slotContent = slots.default({})
      const {
        message = true,
        class: inputClass = '',
        size = 'xl',
        ...inputProps
      } = restProps.inputProps || {}
      slotContent[0].props = {
        ...inputProps, // except for class and size and hideInputState
        modelValue: vModel.value,
        // validateOn usually the same as updateOn, don't pass it if explicitly passed then follow
        [validateOn.value]: modelValidate,
        // if validateOn.value same as props.updateOn, props.updateOn will overwrite
        // inside modelUpdate check for validateOn.value, if so call modelValidate inside too
        [props.updateOn]: modelUpdate,
        // for compatibility with current tests, using data-qa to get inputs
        'data-qa': slotContent[0].props?.['data-qa']?.replace(/group/gi, 'input')
      }
      return h(
        components.MomFormGroup,
        {
          fieldId: props.fieldId,
          inputState: inputState.state,
          messageText: message ? inputState.text : '',
          class: inputClass, // maybe it
          size, // otherwise fallback to default
          ...formGroupProps
        },
        {
          default: () => slotContent
        }
      )
    }
  }
})
