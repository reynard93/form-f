export function extendFunction(originalFn: any, extraFn: any) {
  // no need for async since we not using backend for validation
  return (...args: any[]) => {
    extraFn(...args)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return originalFn ? originalFn.apply(this, args) : void 0
  }
}
