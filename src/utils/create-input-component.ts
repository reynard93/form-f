import { defineComponent, h, inject, unref, PropType, Ref } from 'vue'
import { ListAttributes, useFormField } from '../composable/useFormField'
import { components } from '@momwins/mom-design-system-v3'
import { ErrorState } from '../../typings/error-state'
import kebabToPascalCase from '../utils/kebab-to-pascal-case'
import { FieldTargetWatchFunction } from '../composable/useFormFieldWatch'
import { extendFunction } from './extend-function'
import useFormStore from '../composable/useFormStore'
import { DynamicListeners, Listener } from '../../typings/listener'
import { createFormGroup } from './create_components/createFormGroup'

interface ComponentOptions {
  newProps?: Record<string, any>
  newListeners?: DynamicListeners
  // eslint-disable-next-line @typescript-eslint/ban-types
  validations?: Function // allow internal component validators, extend schema
  validateOn?: Listener[]
  watchers?: FieldTargetWatchFunction[] // should be an array of function each of which gets fromFieldStateAndHandler
}

// helps to differentiate between FormGroup and InputComponent props
export interface FormGroupProps {
  fieldId: string
  label?: string
  size?: 'xs' | 'xs1' | 's' | 'm' | 'l' | 'xl' | 'full' | 'fit'
  inputState: ErrorState['errorState']
  messageText: ErrorState['errorMsg']
}

type OmittedFormProps = 'inputState' | 'messageText' | 'size'

export interface InputComponentProps extends Omit<FormGroupProps, OmittedFormProps> {
  index: number
  validateOnLoad: boolean
  validateOnSubmit: boolean
}

const createInputComponent = (
  componentName: string,
  componentOptions: ComponentOptions = {},
  inputComponentRef?: Ref<any>
) => {
  return defineComponent({
    props: {
      fieldId: {
        type: String as PropType<FormGroupProps['fieldId']>,
        required: true
      },
      size: {
        type: String as PropType<FormGroupProps['size']>
      },
      index: Number as PropType<InputComponentProps['index']>,
      /** specifically customisable validateOn for each component **/
      validateOnLoad: {
        type: Boolean as PropType<InputComponentProps['validateOnLoad']>,
        default: false
      },
      validateOnSubmit: {
        type: Boolean as PropType<InputComponentProps['validateOnSubmit']>,
        default: false
      }
    },
    setup(props, { attrs, slots, emit }) {
      const {
        newProps = {}, // TODO?: probably want to add keys inside to define whether props is for the formgroup or for the component
        // above: if any case we need to pass more props to formgroup besides fieldId inputState or errorState
        newListeners, // for you to add custom action that should happen on certain event trigger
        validateOn = [], // make sure component api supports this event emit, 'onBlur', 'onChange' etc
        watchers = [], // enhance modularity, each of which gets fromFieldStateAndHandler
        validations = {}
      } = componentOptions

      const listId = inject('listId', '') // provide default injection
      const listAttributes = listId
        ? ({
            index: props.index,
            listId
          } as ListAttributes)
        : undefined

      // does not matter that we pass in entire prop, useFormField will only use what it needs from destructuring
      const fieldStateAndHandler = useFormField({
        ...props,
        listAttributes,
        internalValidations: validations
      })
      const {
        vModel,
        show,
        errorState: untypedErrorState,
        options,
        dynamicListeners,
        validate: _validate
      } = fieldStateAndHandler

      const validateWithEmit = extendFunction(() => emit('validated'), _validate)
      // make validate a no-opt if i want to defer the validation to when i submit
      const validate = props.validateOnSubmit ? () => ({}) : validateWithEmit

      const errorState = untypedErrorState as ErrorState

      const finalDynamicListeners: Partial<DynamicListeners> = {}
      validateOn.forEach((eventName: Listener) => {
        const baseListenerFunction = extendFunction(dynamicListeners[eventName], validate)
        // inlining it to remove undefined error
        const newEventListener =
          newListeners && eventName in newListeners && newListeners[eventName]
        if (newEventListener) {
          finalDynamicListeners[eventName] = extendFunction(
            baseListenerFunction,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore here ts is wrong
            newEventListener.bind(this, fieldStateAndHandler)
          )
        } else {
          finalDynamicListeners[eventName] = baseListenerFunction
        }
      })

      /** Custom Watchers **/
      watchers.forEach(watcher => {
        watcher(fieldStateAndHandler, { ...newProps, ...props })
      })

      return () => {
        if (show.value) {
          // if showing push the validator inside, pushed here to have version of validate that emits validated event
          // TODO?: useFormStore().addValidator(validate) // will be neater, abstract accessing list logic
          const { validators } = useFormStore()
          if (listAttributes) {
            const { listId, index } = listAttributes
            validators[listId][index][props.fieldId] = validateWithEmit
          } else {
            validators[props.fieldId] = validateWithEmit
          }
          if (props.validateOnLoad) {
            // TODO?: now run generally all validations, think can move such 'when' to validate within the validation object for performance
            // run only required validations
            validate()
          }
          const children = [
            // TODO?: create design system component for formgroup
            h(components[kebabToPascalCase(componentName)], {
              ref: inputComponentRef, // required for upload Component
              ...attrs,
              ...newProps,
              // TODO: dont pass unnecessary props or attrs
              options: unref(options),
              checked: vModel.value,
              inputState: newProps?.ignoreInputState ? null : errorState?.errorState, // internally inputState is used, makes more sense errorState for me
              modelValue: vModel.value,
              ...finalDynamicListeners,
              'onUpdate:modelValue': (v: any) => {
                vModel.value = v
                // don't pass in when you want to trigger validate on vModelUpdate
                if (!validateOn.length) {
                  validate(v)
                }
              }
            })
          ]

          // slots should be wrapped around here
          const formGroup = createFormGroup(
            {
              fieldId: props.fieldId,
              inputState: errorState?.errorState,
              messageText: errorState?.errorMsg,
              size: props?.size
            },
            children
          )
          return [slots.before?.(), formGroup, slots.after?.()]
        }
      }
    }
  })
}

// TODO: return out the ref
export default createInputComponent
