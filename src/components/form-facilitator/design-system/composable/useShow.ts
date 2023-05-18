import { computed, type ComputedRef } from 'vue'
import { type FieldSchema } from '../../types/schema'
import type { Store, StateTree } from 'pinia'

interface UseShowProps {
  schema: FieldSchema
  store: Store<string, StateTree>
  dependency: Object
}

interface UseShowReturn {
  show: ComputedRef<Boolean>
}

export const useShow = ({ schema, store, dependency }: UseShowProps): UseShowReturn => {
  const show: ComputedRef<Boolean> = computed(() => {
    return schema.show ? schema.show({ state: store, dependency: dependency }) : true
  })

  return {
    show
  }
}
