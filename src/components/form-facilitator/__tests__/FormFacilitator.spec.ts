import { describe, it, expect, beforeEach, vi } from 'vitest'
import { defineStore, setActivePinia, createPinia } from 'pinia'
import { mount, config } from '@vue/test-utils'
import FormFacilitator from '../FormFacilitator.vue'
import FormGroup from '../design-system/FormGroup.vue'
import InputText from '../design-system/InputText.vue'
import designSys from '@momwins/mom-design-system'
import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

config.global.components = {
  'form-facilitator': FormFacilitator,
  'form-group': FormGroup,
  'input-text': InputText
}

describe('FormFacilitator', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders properly', () => {
    const MessageComponent = {
      template: '<form-facilitator ref="form">Some content</form-facilitator>'
    }
    const wrapper = mount(MessageComponent)

    expect(wrapper.text()).toContain('Some content')
  })

  it('should set the value in input text', async () => {
    const store = defineStore('counter', {
      state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
    })

    const MessageComponent = {
      template: `<form-facilitator ref="form" :store="store" :schema="schema">
                  <form-group field-id="name">
                    <input-text/>
                  </form-group>  
                </form-facilitator>`,
      data() {
        return {
          store: store,
          schema: {
            name: {
              defaultValue: 1,
              show() {
                return true
              }
            }
          }
        }
      }
    }

    const wrapper = mount(MessageComponent, {
      global: {
        plugins: [designSys]
      }
    })

    const input = wrapper.find('input')

    expect(input.element.value).toContain('Eduardo')
  })

  describe('#validation', () => {
    it('should show error message in the form group', async () => {
      const store = defineStore('counter', {
        state: () => ({
          name: 'Eduardo',
          _inputState: { name: { inputState: 'error', errorMsg: 'something is wrong' } }
        })
      })

      const MessageComponent = {
        template: `<form-facilitator ref="form" :store="store" :schema="schema">
                  <form-group field-id="name"><input-text /></form-group>  
                </form-facilitator>`,
        data() {
          return {
            store: store,
            schema: { name: { defaultValue: 1, show() { } } }
          }
        }
      }
      const wrapper = mount(MessageComponent, {
        global: {
          plugins: [designSys]
        }
      })

      expect(wrapper.text()).toContain('something is wrong')
    })

    it('should validate all the fields', async () => {
      const store = defineStore('counter', {
        state: () => ({
          name: 'Eduardo',
          _inputState: { name: { inputState: null, errorMsg: '' } }
        })
      })

      const MessageComponent = {
        template: `<form-facilitator ref="form" :store="store" :schema="schema">
                  <form-group field-id="name">
                    <input-text/>
                  </form-group>  
                </form-facilitator>`,
        data() {
          return {
            store: store,
            schema: {
              name: {
                defaultValue: 1,
                show() {},
                validation: {
                  rules: {
                    mandatory: {
                      fn: () => {
                        return true
                      },
                      runMode: 'onValidateAll'
                    },
                    validCheck: {
                      fn: () => {
                        return true
                      },
                      runMode: ''
                    }
                  }
                }
              }
            }
          }
        }
      }

      const wrapper = mount(MessageComponent, {
        global: {
          plugins: [designSys]
        }
      })
      const refs:any = wrapper.vm.$refs

      expect(await refs.form.validateAll()).toBeTruthy()
    })

    it('should validate all sub form facilitator', async () => {
      const parentStore = defineStore('counter', {
        state: () => ({
          name: 'Eduardo',
          _inputState: { name: { inputState: null, errorMsg: '' } }
        })
      })

      const childStore = defineStore('counter', {
        state: () => ({
          name: 'Eduardo',
          _inputState: { name: { inputState: null, errorMsg: '' } }
        })
      })

      const MessageComponent = {
        template: `<form-facilitator ref="parentForm" :store="parentStore" :schema="schema">
                    <form-group field-id="name">
                      <input-text/>
                    </form-group>  
                    <form-facilitator ref="childForm" :store="childStore" :schema="schema">
                      <form-group field-id="name">
                        <input-text/>
                      </form-group>
                    </form-facilitator>
                </form-facilitator>`,
        data() {
          return {
            parentStore,
            childStore,
            schema: {
              name: {
                defaultValue: 1,
                show() { },
                validation: {
                  rules: {
                    mandatory: {
                      fn: () => {
                        return true
                      },
                      runMode: 'onValidateAll'
                    },
                    validCheck: {
                      fn: () => {
                        return true
                      },
                      runMode: ''
                    }
                  }
                }
              }
            }
          }
        }
      }

      const wrapper = mount(MessageComponent, {
        global: {
          plugins: [designSys]
        }
      })
      const refs: any = wrapper.vm.$refs
      const childValidateAll = vi.spyOn(refs.childForm, 'validateAll')

      expect(await refs.parentForm.validateAll()).toBe(true)
      expect(childValidateAll).toHaveBeenCalledOnce()

    })
  })
})
