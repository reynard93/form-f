// createFormGroup.test.ts
import { h } from 'vue'
import { createFormGroup } from './createFormGroup' // replace this line with the correct path to your createFormGroup file
import { expect, vi } from 'vitest'
import { FormGroupProps } from '../create-input-component'
import TestMountHelper from '../../exports/helpers/test-mount'

const defaultFormGroupProps: FormGroupProps = {
  fieldId: 'id1',
  size: 's',
  inputState: null,
  messageText: 'This is a message',
  label: 'This is a label'
}
describe('createFormGroup', () => {
  it('should render correctly', () => {
    const slots = {
      before: vi.fn(),
      after: vi.fn()
    }

    const childNode = h('div')
    const output = createFormGroup(defaultFormGroupProps, [childNode], slots)

    const wrapper = TestMountHelper(output)
    const labelWrapper = wrapper.find('label') // find label element
    expect(labelWrapper.exists()).toBe(true) // assert that the label exists
    expect(labelWrapper.text()).toBe('This is a label') // assert that the label text is correct
    expect(wrapper.find('div.MomFormGroup__Input div').exists()).toBe(true) // assert that the child div exists
  })
})
