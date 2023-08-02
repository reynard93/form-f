import createInputComponent from '@utils/create-input-component'
import { WritableComputedRefValue } from 'vue/macros'

const InputCheckboxButton = createInputComponent('mom-input-checkbox-button', {
  newListeners: {
    // get back everything from useFormField
    onChange: ({ vModel }: { vModel: WritableComputedRefValue<any> }) => {
      vModel.value = !vModel.value
    }
  },
  newProps: {
    value: '1' // determines when checked
  },
  validateOn: ['onChange']
})

export default InputCheckboxButton
