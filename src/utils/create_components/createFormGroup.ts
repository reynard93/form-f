import { h, VNode } from 'vue'
import { components } from '@momwins/mom-design-system-v3'
import { FormGroupProps } from '../create-input-component'

export function createFormGroup(formGroupProps: FormGroupProps, children: VNode<any>[]) {
  const { fieldId, size, inputState, messageText, label } = formGroupProps
  return h(
    components['MomFormGroup'],
    {
      fieldId,
      inputState,
      messageText,
      size,
      label
    },
    {
      default: () => children
    }
  )
}
