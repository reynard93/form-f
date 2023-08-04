import { FieldStateAndHandlers } from './useFormField'
import { watch, WatchCallback, WatchStopHandle } from 'vue'
import { DynamicListeners } from '../../typings/listener'

type FieldHandlersAndListeners<T> = Extract<
  {
    [P in keyof T]: { key: P; value: T[P] }
  }[keyof T],
  // eslint-disable-next-line @typescript-eslint/ban-types
  { key: any; value: Function | DynamicListeners }
>['key']

type WatchableStates = Omit<FieldStateAndHandlers, FieldHandlersAndListeners<FieldStateAndHandlers>>

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
