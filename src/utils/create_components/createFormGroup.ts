import { h, Slots, VNode } from 'vue'
import { components } from '@momwins/mom-design-system-v3'
import { FormGroupProps } from '../create-input-component'

export function createFormGroup(
  formGroupProps: FormGroupProps,
  children: VNode<any>[],
  slots: Readonly<Slots>
) {
  const { fieldId, size, inputState, messageText } = formGroupProps
  return h(
    components['MomFormGroup'],
    {
      fieldId,
      inputState,
      messageText,
      size
    },
    {
      before: () => slots.before?.(),
      default: () => children,
      after: () => slots.after?.()
    }
  )
}
