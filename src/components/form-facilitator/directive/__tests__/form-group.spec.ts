import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import designSys from '@momwins/mom-design-system'
import FormGroup from "../form-group";

describe('', () => {
    it('should return attribute for the component', () => {
        const MessageComponent = {
            template: '<mom-form-group v-formgroup></mom-form-group>',
            setup() {

            },
            directives: {
                formgroup: FormGroup
            }
        }

        const wrapper = mount(MessageComponent, {
            global: {
                plugins: [designSys]
            }
        })
        // console.log(wrapper.vm.attribute)
        console.log(wrapper.html())
        expect(wrapper).toHaveProperty('onBlur')
    })
})
