import { createFormStore } from '../stores/create-store'
import baseSchema from '../baseSchema'

const testStoreProps = {
  schema: baseSchema,
  dependency: {}
}

// create store
export default createFormStore(testStoreProps)
