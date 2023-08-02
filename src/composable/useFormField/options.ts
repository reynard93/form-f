import { Ref } from 'vue'

export async function getOptions(
  options: any,
  formState: any,
  fieldOptions: Ref<{ value: string; label: string }[]>
) {
  if (typeof options === 'function') {
    const data = options({ state: formState })
    if (data instanceof Promise) {
      fieldOptions.value = await data
    } else {
      fieldOptions.value = data
    }
  } else if (options) {
    fieldOptions.value = options
  }
}
