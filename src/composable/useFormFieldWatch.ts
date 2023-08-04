import { FieldStateAndHandlers } from './useFormField'
import { Ref, watch, WatchCallback, WatchStopHandle } from 'vue'

// type FilterByType<Base, Type> = {
//   [Key in keyof Base]: Base[Key] extends Type ? Key : never
// }
// type MatchedKeys = FilterByType<FieldStateAndHandlers, Ref<any>>
// type WatchableStates = Pick<FieldStateAndHandlers, MatchedKeys[keyof MatchedKeys]>

// maybe can use Extract here instead?
// ReactiveVariable<any> | extract inside should be from loop
// how to loop through an object type
type RefTypes<T> = Extract<
  {
    [P in keyof T]: { key: P; value: T[P] }
  }[keyof T],
  { key: any; value: Ref }
>

type WatchableStates = RefTypes<FieldStateAndHandlers>
// type WatchableStates = Pick<FieldStateAndHandlers, keyof Extract<FieldStateAndHandlers, Ref<any>>>

//     {
//   [P in keyof FieldStateAndHandlers]: Pick<Extract<FieldStateAndHandlers[P], Ref<any>>>
// }

export type FieldTargetWatchFunction = (
  // eslint-disable-next-line no-unused-vars
  watchableStates: WatchableStates,
  // eslint-disable-next-line no-unused-vars
  props: any
) => WatchStopHandle

export function useFormFieldWatch(
  targetKey: keyof WatchableStates,
  // eslint-disable-next-line no-unused-vars
  handler: (fieldActionsOrState: any) => WatchCallback<any, any>
): FieldTargetWatchFunction {
  // when called within CreateInputComponent, targetKey is ensured to be a valid key
  return (watchableStates, props, deep = true) => {
    // Valid watch target is ensured by the type system
    return watch(watchableStates[targetKey], handler({ ...watchableStates, ...props }), {
      deep
    })
  }
}
