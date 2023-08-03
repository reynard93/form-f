import { vi, describe, it, expect } from 'vitest'

const momUploadStub = {
  template: '<div />',
  methods: {
    yourMethod: vi.fn()
    // other methods...
  }
}

import { mount } from '@vue/test-utils'
import DocumentUploader from './DocumentUploader'
import designSystem from '../../design-system'

describe('DocumentUploader', () => {
  it('can access methods in mom-upload', async () => {
    const wrapper = mount(DocumentUploader(), {
      props: {
        fieldId: 'testFieldId',
        // other props
        index: 0,
        label: 'Your Label',
        messageText: 'Your Message Text'
      },
      global: {
        stubs: {
          'mom-upload': momUploadStub
        },
        plugins: [designSystem],
        mocks: {
          // in design-system is used to dom purify
          $html: v => v
        }
      }
    })

    // const uploadComponent = wrapper.findComponent({ ref: 'inputComponentRef' })

    // expect(uploadComponent.exists()).toBe(true)
    // // Here, you can test the methods in the 'mom-upload' component
    // expect(uploadComponent.vm.yourMethod).toBeDefined()
    //
    // await uploadComponent.vm.yourMethod() // call the method
    //
    // // check if the method is called
    // expect(momUploadStub.methods.yourMethod).toHaveBeenCalled()
  })
})

// Now you can access and test properties and methods of the uploadComponent
// For example:
// expect(uploadComponent.props().maxFiles).toBe(2);
// expect(uploadComponent.props().linkType).toBe('securelink');
// // You can also trigger events on the component if needed.
//
// // For debugging, you can log the component to see its properties and methods:
// console.log(uploadComponent.vm); // This will log the Vue instance of the component.
