import type { App } from 'vue'
import FormFacilitator from './components/core/FormFacilitator.vue'
import FormHeader from './components/header/FormHeader.vue'

export default {
  install(app: App) {
    app.component('form-facilitator', FormFacilitator)
    app.component('form-header', FormHeader)
  }
}
