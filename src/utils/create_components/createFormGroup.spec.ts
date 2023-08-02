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

  it('should render correctly with slots', () => {
    // define some dummy markup for slots
    const beforeContent = h('span', { id: 'beforeContent' }, 'Before content')
    const afterContent = h('span', { id: 'afterContent' }, 'After content')

    const slots = {
      before: () => beforeContent,
      after: () => afterContent
    }

    const childNode = h('div')
    const output = createFormGroup(defaultFormGroupProps, [childNode], slots)

    const wrapper = TestMountHelper(output)
    console.log(wrapper.html(), ' this is what i have')
    // Check that slots are rendered correctly
    expect(wrapper.find('#beforeContent').exists()).toBe(true)
    expect(wrapper.find('#beforeContent').text()).toBe('Before content')

    expect(wrapper.find('#afterContent').exists()).toBe(true)
    expect(wrapper.find('#afterContent').text()).toBe('After content')
  })
})
