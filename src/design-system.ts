// this is a workaround to support factory function and applying customsiation/hotfixes to the form components
// save all the components into an object
import { components } from '@momwins/mom-design-system-v3'
import { App, Component } from 'vue'

// this is a workaround to support factory function and applying customisation/hotfixes to the form components
// save all the components into an object
// importing like this possible to improve performance and allows me to use my factory functions

const designSys = {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component as Component)
    })
  }
}

export default designSys
