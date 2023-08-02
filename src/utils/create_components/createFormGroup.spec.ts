// createFormGroup.test.ts
import { h } from 'vue'
import { createFormGroup } from './createFormGroup' // replace this line with the correct path to your createFormGroup file
import { expect, describe, it } from 'vitest'
import { FormGroupProps } from '../create-input-component'
import TestMountHelper from '../../exports/helpers/test-mount'
import { screen } from '@testing-library/vue'

const defaultFormGroupProps: FormGroupProps = {
  fieldId: 'id1',
  size: 's',
  inputState: null,
  messageText: 'This is a message',
  label: 'This is a label'
}
describe('createFormGroup', () => {
  it('should render correctly', () => {
    const output = createFormGroup(defaultFormGroupProps, [h('div', 'This is a child')])

    TestMountHelper(output)
    // assert that the label exists and its text is correct

    expect(screen.getByText('This is a label')).toBeTruthy()
    expect(screen.getAllByText('This is a child')).toBeTruthy()
  })

  it('should not show messageText when inputState is null', () => {
    const output = createFormGroup(defaultFormGroupProps, [h('div', 'This is a child')])

    TestMountHelper(output)

    expect(screen.queryByText('This is a message')).toBeFalsy()
  })

  it('should not show messageText when inputState is disabled', () => {
    const formGroupProps: FormGroupProps = {
      fieldId: 'id1',
      size: 's',
      inputState: 'disabled',
      messageText: 'This is a warning message',
      label: 'This is a label'
    }

    const output = createFormGroup(formGroupProps, [h('div', 'This is a child')])

    TestMountHelper(output)

    expect(screen.queryByText('This is a message')).toBeFalsy()
  })

  it('shows messageText when inputState is "error"', () => {
    const formGroupProps: FormGroupProps = {
      fieldId: 'id1',
      size: 's',
      inputState: 'error',
      messageText: 'This is a error message',
      label: 'This is a label'
    }

    const output = createFormGroup(formGroupProps, [h('div', 'This is a child')])
    TestMountHelper(output)
    expect(screen.getByText('This is a error message')).toBeTruthy()
  })

  it('shows messageText when inputState is "warning"', () => {
    const formGroupProps: FormGroupProps = {
      fieldId: 'id1',
      size: 's',
      inputState: 'warning',
      messageText: 'This is a warning message',
      label: 'This is a label'
    }

    const output = createFormGroup(formGroupProps, [h('div', 'This is a child')])
    TestMountHelper(output)
    expect(screen.getByText('This is a warning message')).toBeTruthy()
  })
})
