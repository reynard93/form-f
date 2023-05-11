// import { mount } from '@vue/test-utils'
// import { describe, it, expect, beforeEach } from 'vitest'
// import { useValidate } from '../useValidation'

// const mountComposition = (cb: () => any) => {
//   return mount({
//     setup() {
//       return cb()
//     },
//     render(h) {
//       return h('div')
//     }
//   })
// }

// describe('My Test', () => {
//   it('Works', () => {
//     let value
//     const store = defineStore('counter', {
//       state: () => ({ name: 'Eduardo', _inputState: { name: { inputState: null, errorMsg: '' } } })
//     })

//     const component = mountComposition(() => {
//       value = useValidate()
//     })

//     expect(value).toBe(true)
//   })
// })
