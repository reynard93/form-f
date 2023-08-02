import { createPinia } from 'pinia'

const piniaInstance = createPinia() // export out this pinia and allow it to be accessible from consuming package as a hook

export { piniaInstance }
