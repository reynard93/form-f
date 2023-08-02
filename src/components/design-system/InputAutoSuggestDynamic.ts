import createInputComponent from '@utils/create-input-component'
// import { useFormFieldWatch } from '@composable/useFormFieldWatch'

const InputAutoSuggestDynamic = createInputComponent('mom-input-autosuggest-dynamic', {
  // newProps: {
  //   resetSelection: true
  // }
  // watchers: [
  //   // leave this here for now though don't really know what this 'reset' is for
  //   useFormFieldWatch('options', ({ reset, resetSelection }) => () => {
  //     console.log('resetSelection', resetSelection)
  //     if (resetSelection) {
  //       reset()
  //     }
  //   })
  // ]
})

export default InputAutoSuggestDynamic
