import { describe, it, expect, beforeEach } from 'vitest'
import { defineStore, setActivePinia, createPinia } from 'pinia'
import { mount, config } from '@vue/test-utils'
import InputText from '../InputText.vue'
import designSys from '@momwins/mom-design-system'
import { flushPromises } from '@vue/test-utils'

config.global.components = { 
    'input-text': InputText
}

describe('InputText', () => {
    let wrapper: any

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('input text should have an error class', async () => {
        const store = defineStore('counter', {
            state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
        })

        const MessageComponent = {
            template: '<input-text />',
            data() {
                return {
                    store: store()
                }
            },
            provide() {
                return {
                    store: store,
                    fieldId: 'name',
                    options: {},
                    dependency: {},
                    getSchema: () => ({
                        defaultValue: 1, validation: {
                            rules: {
                                mandatory: {
                                    fn: () => {
                                        return false
                                    },
                                    runMode: ''
                                }
                            }
                        }
                    }),
                    getMessage: () => "Invalid input text",
                    onLoad: () => { },
                    onDestroy: () => { }
                }
            } 
        }
 

        wrapper = mount(MessageComponent, {
            global: {
                plugins: [designSys]
            }
        })
        wrapper.find('input').setValue('')
        wrapper.find('input').trigger('blur')

        await flushPromises()

        expect(wrapper.find('.MomInputText--input-state-error').exists()).toBe(true)
    })

    describe('#Validation On Load', () => {
        it('validation should run on the load when validate-on-load is true', async () => {
            const store = defineStore('counter', {
                state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
            })

            const MessageComponent = {
                template: '<input-text :validate-on-load="true" />',
                data() {
                    return {
                        store: store()
                    }
                },
                provide() {
                    return {
                        store: store,
                        fieldId: 'name',
                        options: {},
                        dependency: {},
                        getSchema: () => ({
                            defaultValue: 1, validation: {
                                rules: {
                                    mandatory: {
                                        fn: () => {
                                            return false
                                        },
                                        runMode: ''
                                    }
                                }
                            }
                        }),
                        getMessage: () => "Invalid input text",
                        onLoad: () => { },
                        onDestroy: () => { }
                    }
                }
            }


            wrapper = mount(MessageComponent, {
                global: {
                    plugins: [designSys]
                }
            })

            await flushPromises()

            expect(wrapper.find('.MomInputText--input-state-error').exists()).toBe(true)
        })

        it('validation should not run on the load when validate-on-load is false', async () => {
            const store = defineStore('counter', {
                state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
            })

            const MessageComponent = {
                template: '<input-text :validate-on-load="false" />',
                data() {
                    return {
                        store: store()
                    }
                },
                provide() {
                    return {
                        store: store,
                        fieldId: 'name',
                        options: {},
                        dependency: {},
                        getSchema: () => ({
                            defaultValue: 1, validation: {
                                rules: {
                                    mandatory: {
                                        fn: () => {
                                            return false
                                        },
                                        runMode: ''
                                    }
                                }
                            }
                        }),
                        getMessage: () => "Invalid input text",
                        onLoad: () => { },
                        onDestroy: () => { }
                    }
                }
            }


            wrapper = mount(MessageComponent, {
                global: {
                    plugins: [designSys]
                }
            })

            await flushPromises()

            expect(wrapper.find('.MomInputText--input-state-error').exists()).toBe(false)
        })
    })

    describe('#Show', () => {
        it('field should show and hide on schema condition', async () => {
            const store = defineStore('counter', {
                state: () => ({ name: 'show the field', _inputState: { name: { inputState: null, errorMsg: '' } } })
            })

            const MessageComponent = {
                template: '<input-text/>',
                data() {
                    return {
                        store: store()
                    }
                },
                provide() {
                    return {
                        store: store,
                        fieldId: 'name',
                        options: {},
                        dependency: {},
                        getSchema: () => ({
                            defaultValue: 1,
                            show(payload: any) {
                                const state = payload.state
                                return state.name === "show the field"
                            },
                            validation: {
                                rules: {
                                    mandatory: {
                                        fn: () => {
                                            return false
                                        },
                                        runMode: ''
                                    }
                                }
                            }
                        }),
                        getMessage: () => "Invalid input text",
                        onLoad: () => { },
                        onDestroy: () => { }
                    }
                }
            }


            wrapper = mount(MessageComponent, {
                global: {
                    plugins: [designSys]
                }
            })

            await flushPromises() 

            expect(wrapper.find('input').exists()).toBe(true)

            wrapper.find('input').setValue('do not show')
            wrapper.find('input').trigger('blur')
            
            await flushPromises() 

            expect(wrapper.find('input').exists()).toBe(false)
        })
    })
});
