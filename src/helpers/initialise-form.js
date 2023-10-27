import { capitalize, reactive } from 'vue'

// TODO: ensure every fieldId key is unique, regardless how nested
export function createFormState(schema) {
  return Object.keys(schema).reduce((acc, key) => {
    const _schema = schema[key]
    const _isFieldSchema = !('schema' in _schema)
    acc[key] = _isFieldSchema ? _schema.defaultValue : []
    return acc
  }, reactive({}))
}

export function getFormValidator(schema, path = '', acc = {}) {
  for (const key in schema) {
    const fullPath = path ? `${path}.${key}` : key
    const _schema = schema[key]
    const _isFieldSchema = !('schema' in _schema)
    if (_isFieldSchema) {
      // would prefer not to have so much nesting but wrapping in options to be compatible with preexisting schema
      acc[fullPath] = _schema.validation?.rules || {}
    } else {
      getFormValidator(_schema.schema, fullPath, acc) // handle nested schemas
    }
  }
  return acc
}

export function createFormDispatchers(formState, schema, path = '', acc = {}) {
  for (const key in schema) {
    // should create a formPath helper class
    const fullPath = path ? `${path}.set${capitalize(key)}` : key
    const _schema = schema[key]
    const _isFieldSchema = !('schema' in _schema)
    const capitalizedPath = capitalize(fullPath)
    if (_isFieldSchema) {
      acc[`set${capitalizedPath}`] = (value, index) => {
        if (index !== undefined) {
          formState[path][index][key] = value
        } else {
          formState[key] = value
        }
      }
    } else {
      // for adding nested form
      acc[`add${capitalizedPath}`] = stateRef => {
        formState[fullPath].push(stateRef)
      }
      // for removing a nested form
      acc[`remove${capitalizedPath}`] = index => {
        if (index === undefined || !formState[fullPath][index]) {
          throw Error('tried to remove invalid index')
        }
        formState[fullPath].splice(index, 1)
      }
      createFormDispatchers(formState, _schema.schema, fullPath, acc) // handle nested schemas
    }
  }
  return acc
}

// i don't think pinia adds much, everything is still very much observable from vue devtools on the component itself
// you can still choose to wrap the formState in pinia after getting a ref to FF and getting the formState
const initialiseForm = schema => {
  const formState = createFormState(schema)
  const formValidators = getFormValidator(schema)
  const formDispatchers = createFormDispatchers(formState, schema)
  // TODO: when return make them readOnly for safety or frozen so they are not modifiable
  return {
    formDispatchers,
    formValidators,
    formState
  }
}

export default initialiseForm
