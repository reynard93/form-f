export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj // Return non-object values as is
  }
  // Create an empty object or array of the same type as obj
  const cloned = Array.isArray(obj) ? ([] as T) : ({} as T)
  // Iterate over each property in obj
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Recursively clone each property
      cloned[key as keyof T] = deepClone(obj[key])
    }
  }
  // Preserve the prototype of the original object
  if (obj instanceof Object) {
    Object.setPrototypeOf(cloned, Object.getPrototypeOf(obj))
  }

  return cloned as T
}
