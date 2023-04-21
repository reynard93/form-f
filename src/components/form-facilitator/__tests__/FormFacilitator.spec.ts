import { describe, it, expect, beforeEach } from 'vitest'
import { defineStore, setActivePinia, createPinia } from 'pinia'
import { mount, config } from '@vue/test-utils'
import FormFacilitator from '../FormFacilitator.vue'
import FormGroup from '../design-system/FormGroup.vue'
import InputText from '../design-system/InputText.vue'
import designSys from '@momwins/mom-design-system'

import { nextTick } from 'vue'

config.global.components = {
  'form-facilitor': FormFacilitator,
  'form-group': FormGroup,
  'input-text': InputText
}

describe('FormFacilitator', () => {
  let wrapper: any

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders properly', () => {
    const MessageComponent = {
      template: '<form-facilitor ref="form">Some content</form-facilitor>'
    }
    wrapper = mount(MessageComponent)

    expect(wrapper.text()).toContain('Some content')
  })

  it('should expose validateAll method', () => {
    const MessageComponent = {
      template: '<form-facilitor ref="form">Some content</form-facilitor>'
    }
    wrapper = mount(MessageComponent)

    const instance: any = wrapper.vm.$refs.form

    expect(typeof instance.validateAll).toBe('function')
  })

  it('should show error message in the form group', async () => {
    const store = defineStore('counter', {
      state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: "error", errorMsg: 'something is wrong' } } })
    }) 

    const MessageComponent = {
      template: `<form-facilitor ref="form" :store="store" :schema="schema">
                  <form-group field-id="name"><input-text /></form-group>  
                </form-facilitor>`,
      data() {
        return {
          store: store,
          schema: { name: { defaultValue: 1, show() { } } }
        }
      }
    }
    wrapper = mount(MessageComponent, {
      global: {
        plugins: [designSys]
      }
    })
    expect(wrapper.text()).toContain("something is wrong")

    wrapper.vm.store()._inputState.name.inputState = null
    wrapper.vm.store()._inputState.name.errorMsg = ""

    await nextTick()
    
    expect(wrapper.text()).not.toContain("something is wrong")

  })

  it('should set the value in input text', async () => {
    const store = defineStore('counter', {
      state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
    }) 

    const MessageComponent = {
      template: `<form-facilitor ref="form" :store="store" :schema="schema">
                  <form-group field-id="name">
                    <input-text/>
                  </form-group>  
                </form-facilitor>`,
      data() {
        return {
          store: store,
          schema: { name: { defaultValue: 1, show() { return true } } }
        }
      }
    }

    wrapper = mount(MessageComponent, {
      global: {
        plugins: [designSys]
      }
    })

    const input = wrapper.find('input') 

    expect(input.element.value).toContain("Eduardo")

    wrapper.vm.store().name = "testing wins"
   
    await nextTick()

    expect(input.element.value).toContain("testing wins")

    wrapper.find('input').setValue("new text")

    expect(wrapper.vm.store().name).toContain("new text")
  })

  describe('#validateAll', () => {
    it('', () => {
      const store = defineStore('counter', {
        state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
      })

      const MessageComponent = {
        template: `<form-facilitor ref="form" :store="store" :schema="schema">
                  <form-group field-id="name">
                    <input-text/>
                  </form-group>  
                </form-facilitor>`,
        data() {
          return {
            store: store,
            schema: {
              name: {
                defaultValue: 1,
                show() { },
                validation: {
                  rules: {
                    mandatory: {
                      fn: () => {return false},
                      runMode: 'onValidateAll'
                    },
                    validCheck: {
                      fn: () => { return false },
                      runMode: ''
                    }
                  }
                }
              }
            }
          }
        }
      }

      wrapper = mount(MessageComponent, {
        global: {
          plugins: [designSys]
        }
      })

      wrapper.vm.$refs.form.validateAll()
    })
  })
})
