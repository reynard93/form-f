import { useFormFaciliator } from '../form'
import { mount } from '@vue/test-utils'
import designSys from '@momwins/mom-design-system'
import { defineStore, setActivePinia, createPinia } from 'pinia'
import { flushPromises } from '@vue/test-utils'

describe('#FormComposable', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    describe('#InputText', () => {
        const getTestingComponent = () => {
            const component = {
                template: `<mom-input-text ref="input" 
                    v-model="getAttribute('name').vmodel"
                    v-if="getAttribute('name').show"
                    @blur="getAttribute('name').blur"
                    v-bind="getAttribute('name').common"
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

                    const messages = {
                        name: {
                            mandatory : 'Name cant be error'
                        }
                    }

                    const { getAttribute } = useFormFaciliator({ store, schema, dependency: {}, messages })

                    return { store, getAttribute }
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

            expect(wrapper.vm.store._inputState).toEqual({ name: { inputState: 'error', errorMsg: 'Name cant be error' } })
        })
    }) 

    describe('#InputSelect', () => {
        const getTestingComponent = () => {
            const component = {
                template: `<mom-input-select ref="input"  v-if="getAttribute('name').show"
                                :options="getAttribute('name').options"
                            />`,
                setup() {
                    const store = defineStore('counter', {
                        state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
                    })()

                    const schema = {
                        name: {
                            defaultValue: 1,
                            show({ state }: any) {
                                return true
                            },
                            options: [{
                                label: "eaDeclaration",
                                value: "AGREED"
                            }],
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

                    const messages = {
                        name: {
                            mandatory: 'Name cant be error'
                        }
                    }

                    const { getAttribute } = useFormFaciliator({ store, schema, dependency: {}, messages })
                    console.log(getAttribute('name').options)
                    return { store, getAttribute }
                }
            }

            return mount(component, {
                global: {
                    plugins: [designSys]
                }
            })
        }

        it('should display dropdown from schema', async () => {
            const wrapper = getTestingComponent()
        })
    })
})
