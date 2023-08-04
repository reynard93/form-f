import { FieldStateAndHandlers } from '../src/composable/useFormField'

// Listener is loose. trick to support loose autocomplete, autocomplete for definitely known on events but flexible to cater for new ones
export type Listener = 'onBlur' | 'onChange' | (string & {}) // eslint-disable-line

export type DynamicListeners = {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/ban-types
  [K: Listener]: (
    // eslint-disable-next-line no-unused-vars
    fieldStateAndHandler: FieldStateAndHandlers,
    // eslint-disable-next-line no-unused-vars
    ...args: any[]
  ) => void
}
