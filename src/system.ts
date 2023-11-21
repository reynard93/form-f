import type { App } from 'vue'
import FormHeader from './components/header/FormHeader.vue'
import FormFaciliator from "./components/core/FormFaciliator.js";

export default {
  install(app: App) {
    app.component('form-header', FormHeader)
    app.component('FormFacilitator', FormFaciliator)
  }
}
