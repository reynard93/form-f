import designSystem from '../../design-system'
import { VNode } from 'vue'
import { render } from '@testing-library/vue'

const TestMountHelper = (component: VNode<any>) =>
  render(component, {
    global: {
      plugins: [designSystem],
      mocks: {
        // in design-system is used to dom purify
        $html: v => v
      }
    }
  })

export default TestMountHelper
