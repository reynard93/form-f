import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFormFaciliator } from '../form'
import { mount, config } from '@vue/test-utils'
import designSys from '@momwins/mom-design-system'
import { defineStore, setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

import { get as objGet, set as objSet } from 'lodash'
import { reactive } from 'vue'

describe('#FormComposable', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    describe('#InputText', () => {
        const getTestingComponent = () => {
            const component = {
                template: `<mom-input-text ref="input" 
                    v-model="nameFieldAttr.vmodel"
                    v-if="nameFieldAttr.show"
                    @blur="nameFieldAttr.blur"
                    :input-state="nameFieldAttr.fieldState.inputState"
                />`,
                setup() {
                    const store = defineStore('counter', {
                        state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
                    })()

                    const schema = {
                        name: {
                            defaultValue: 1,
                            show({ state }: any) {
                                return state.name === 'Eduardo'
                            },
                            validation: {
                                rules: {
                                    mandatory: {
                                        fn: (value: string) => {
                                            return value
                                        }
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

                    const { vModel, show, onBlur, fieldState } = useFormFaciliator({ store, schema, dependency: {} })

                    const nameFieldAttr = reactive({
                        vmodel: vModel('name'),
                        show: show('name'),
                        blur: onBlur('name'),
                        fieldState: fieldState('name')
                    })

                    return { store, nameFieldAttr }
                }
            }

            return mount(component, {
                global: {
                    plugins: [designSys]
                }
            })
        }

        it('should return set value and get value into the component using v-model', async () => {
            const wrapper = getTestingComponent()

            const input = wrapper.find('input');

            expect(input.element.value).toContain('Eduardo')

            input.setValue("something new")

            expect(wrapper.vm.store.name).toContain('something new')

        })

        it('should show and hide based on the schema logic', async () => {
            const wrapper = getTestingComponent()

            expect(wrapper.find('input').exists()).toBeTruthy()

            wrapper.vm.store.name = "somthing new"

            await flushPromises()

            expect(wrapper.find('input').exists()).toBeFalsy()
        })

        it('should run validation logic on blur', async () => {
            const wrapper = getTestingComponent()

            const input = wrapper.find('input')

            input.setValue("")
            input.trigger('blur')

            await flushPromises()

            expect(wrapper.vm.store._inputState).toEqual({ name: { inputState: 'error', errorMsg: 'message' } })
        })
    }) 
})
