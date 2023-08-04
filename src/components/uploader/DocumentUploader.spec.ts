import { setActivePinia, createPinia } from 'pinia'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import texts from '../../../lang/en.json'

// all i need here is the removeFile method
const momUploadStub = {
  template: '<div>upload-stub</div>',
  methods: {
    removeFile: vi.fn()
    // other methods...
  }
}

import { mount } from '@vue/test-utils'
import DocumentUploader from './DocumentUploader'
import designSystem from '../../design-system'
import useFormStore from '../../composable/useFormStore'
// component relies on actual actions from the store, we won't be testing the component in isolation
// TODO: separate out coupling with pinia on the components
// was trying to use the mom-upload component as-is but error happens for hiddenInputContainer,
// spent too much time hard to debug and cannot fix
describe('DocumentUploader', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    // don't use createFormStore, useFormStore instead (higher level)
    useFormStore({
      schema: {
        testUpload: {
          defaultValue: []
        }
      }
    })
  })
  it('can access methods in mom-upload', async () => {
    const wrapper = mount(DocumentUploader(), {
      props: {
        fieldId: 'testUpload',
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
          $html: (v: any) => v,
          $encode: (v: any) => v,
          $decode: (v: any) => v,
          $txt: (val: string) => {
            const strArr = val.split('.')
            let text: Record<string, any> = texts
            strArr.forEach(value => {
              text = text[value]
            })
            return text
          }
        }
      }
    })
    const uploadComponent = wrapper.findComponent(momUploadStub)

    expect(uploadComponent.exists()).toBe(true)
    expect(uploadComponent.vm.removeFile).toBeDefined()

    // // do stuff that would result in removeFile being called
    // await uploadComponent.vm.yourMethod()
    //
    // expect(momUploadStub.methods.removeFile).toHaveBeenCalled()
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
