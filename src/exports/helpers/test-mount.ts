import { mount } from '@vue/test-utils'
import designSystem from '../../design-system'
import { VNode } from 'vue'

const TestMountHelper = (component: VNode<any>) =>
  mount(component, {
    global: {
      plugins: [designSystem],
      mocks: {
        // in design-system is used to dom purify
        $html: v => v
      }
    }
  })

export default TestMountHelper
