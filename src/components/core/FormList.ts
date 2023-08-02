import {
  capitalize,
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  useSlots,
  VNode,
  watch
} from 'vue'
import { components } from '@momwins/mom-design-system-v3'
import { getSchema } from '../../composable/useFormField/schema'
import useFormStore from '../../composable/useFormStore'

const { MomLink } = components
type ArrayWithLastElementNull<T> = [T, ...T[], null] // T in front is to make sure tuple always contain 1 elem before null

// TODO, validate no negative min number allowed
// TODO, validate max > min for listSchema and when adding to list does not exceed max
const FormList = defineComponent({
  props: {
    fieldId: {
      type: String,
      required: true
    },
    removeLabel: {
      type: String,
      default: 'remove item'
    },
    addLabel: {
      type: String,
      default: 'add item'
    }
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup({ fieldId, addLabel, removeLabel }) {
    //removeLabel,
    const formStore = useFormStore()
    const { show: showFn = () => true } = getSchema(formStore, fieldId)

    const { errorStates, formState, validators } = formStore
    const show = computed(() => showFn(formState))

    provide('listId', fieldId)
    const slots = useSlots()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //  @ts-ignore
    const slotContent = slots.default({}) as VNode | VNode[]
    // null is to add one extra space to put in the remove button
    const _slotVnodes = Array.isArray(slotContent) ? slotContent : [slotContent]
    const pushNullToVNodes = (vNodes: VNode[]): ArrayWithLastElementNull<VNode> => {
      // Push null to the array don't want to concat or spread for performance
      vNodes.push(null as any) // We cast null as any here to bypass TypeScript error.
      return vNodes as ArrayWithLastElementNull<VNode>
    }
    const slotVnodes = pushNullToVNodes(_slotVnodes)
    // use this for render since normally vNodes are not reactive
    const listState = reactive({
      formSectionNodes: [] as VNode[]
    })

    const remove = (index: number) => {
      formStore[`removeIdx${capitalize(fieldId)}`](index)
    }

    watch(
      show,
      // if need can register validate, so can flexibly be called by parent
      (newShow: boolean) => {
        if (newShow) {
          errorStates[fieldId] = []
          validators[fieldId] = []
        }
      },
      { immediate: true }
    )
    const removeLinkVNode = (index: number) => {
      return h(
        MomLink,
        {
          icon: 'remove',
          type: 'button',
          onClick: () => remove(index)
        },
        () => removeLabel
      )
    }
    watch(
      formState[fieldId],
      ({ length }) => {
        // it generates everything anew, nodes can get removed from any point it's safer to regenerate
        listState.formSectionNodes = Array.from({ length }).flatMap((_, index) => {
          return slotVnodes.map(vnode => {
            if (vnode === null) {
              return removeLinkVNode(index)
            }
            vnode.props = {
              ...vnode.props,
              index
            }

            return vnode
          })
        })
      },
      { immediate: true }
    )

    const add = () => {
      formStore[`addIdx${capitalize(fieldId)}`]()
    }

    // Create a render function to output the vNodes
    return () => {
      if (!show.value) {
        return null
      }
      const addLinkVNode = h(
        MomLink,
        {
          icon: 'add',
          type: 'button',
          onClick: add
        },
        () => addLabel
      )

      return [...listState.formSectionNodes, addLinkVNode]
    }
  }
})

export default FormList
