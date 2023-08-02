import { isFieldSchema } from './schema-guard'
import { capitalize, computed } from 'vue'
import { ListFieldSchema } from '../../typings/schema'
import { initialiseFormState } from './init-form-state'
import { ListAttributes } from '../../typings/list-attribute'

export function createActionsFromProps(schema: any, formState: any, errorStates: any) {
  return Object.keys(schema).reduce((actions, key) => {
    const actionName = `${capitalize(key)}`
    const currentIdx = computed(() => formState.value[key].length)
    const _schema = schema[key]

    if (isFieldSchema(_schema)) {
      actions[`set${actionName}`] = function (newValue?: any, listAttributes?: ListAttributes) {
        if (listAttributes) {
          formState.value[listAttributes.listId][listAttributes.index][key] = newValue //OWN fieldId
        } else {
          formState.value[key] = newValue
        }
      }
    } else {
      const _schemaList = _schema as ListFieldSchema
      actions['addIdx' + actionName] = () => {
        // errorStates needs to be b4 formState, else currentIdx not synced with formState
        errorStates.value[key][currentIdx.value] = {}
        formState.value[key][currentIdx.value] = initialiseFormState(_schemaList.schema)
      }
      actions['removeIdx' + actionName] = function (index: number) {
        if (currentIdx.value - 1 >= _schemaList.min) {
          formState.value[key].splice(index, 1) // where dont need .value?
          errorStates.value[key].splice(index, 1)
        }
      }
      actions = {
        ...actions,
        ...createActionsFromProps(_schemaList.schema, formState, errorStates)
      }
    }
    actions['validateForm'] = function () {
      // run all validations, i need to create a watcher on validateCount state inside create-input-component
      formState.value.validateCount++
    }

    return actions
  }, {} as Record<string, any>)
}
