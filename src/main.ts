import { createApp } from 'vue'
import designSys from '@momwins/mom-design-system-v3'
import App from './App.vue'
// even after exclude on tsconfig still need to not import to compile
// import { makeServer } from './server'
import './assets/main.css'
import messages from '../lang/en.json'
import { piniaInstance } from './stores/pinia'
import formComponent from '../src/system'

export const LaPlugin = {
  install: (app: any) => {
    app.config.globalProperties.$la = (str: string) => {
      const strArr = str.split('.')
      let message = messages
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      strArr.forEach((value: string) => (message = message[value]))
      return message
    }
  }
}

// testing dev plugin, when it is used in a form it is passed through install from system.ts(reference old form compontents)
// shall hardcode baseUrl uamApiUrl and paymentApiUrl, in form these urls are passed down from options
export const TestUrlPlugin = {
  install: (app: any) => {
    // these apis are setup using miraqe, under src/server.ts
    // maybe can use this same one, but if options was passed in then use it, otherwise use this one
    app.config.globalProperties.url = {
      baseApi: process.env.baseUrl,
      uamApi: process.env.uamApiUrl,
      paymentApi: process.env.paymentApiUrl,
      documentApi: process.env.documentUrl
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  // makeServer()
}

const app = createApp(App)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(designSys)
app.use(formComponent)
app.use(piniaInstance)
app.use(LaPlugin)
app.use(TestUrlPlugin)

app.mount('#app')

export { app }
