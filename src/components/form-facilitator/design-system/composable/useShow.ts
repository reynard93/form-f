import { computed } from 'vue'

import type { Store, StateTree } from 'pinia'

interface UseShowArguments {
    schema: Schema,
    store: Store<string, StateTree>,
    dependency: Object,
}


export const useShow = ({ schema, store, dependency }: UseShowArguments) => {
    const show = computed(() => {
        return schema.show ? schema.show({ state: store, dependency: dependency }) : true
    })

    return {
        show
    }
}
