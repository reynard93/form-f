const listeners = ['onBlur', 'onChange'] as const
type ListenersAsType = typeof listeners
export type Listener = ListenersAsType[number]

export type DynamicListeners = {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/ban-types
  [K in Listener]?: (...args: any[]) => void & Function<any>
}
