import { StoreProps } from '@typings/store'
import { createFormStore } from '../stores/create-store'

// Singleton
let _store: any
const useFormStore = (storeProps?: StoreProps) => {
  if (_store) {
    return _store
  }

  _store = createFormStore(storeProps)
  return _store
}
export default useFormStore
