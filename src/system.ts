import type { App } from 'vue'
import FormFacilitator from './components/form-facilitator/FormFacilitator.vue'

const System = {
  install(app: App) {
    app.component('form-facilitator', FormFacilitator)
  }
}

export default System
