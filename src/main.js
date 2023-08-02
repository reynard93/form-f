import { createApp } from 'vue';
// import { createPinia } from 'pinia'
import designSys from '@momwins/mom-design-system';
import App from './App.vue';
// @ts-ignore
import store from './store';
import { makeServer } from './server';
import './assets/main.css';
import messages from '../lang/en.json';
export const LaPlugin = {
    install: (app) => {
        app.config.globalProperties.$la = (str) => {
            const strArr = str.split('.');
            let message = messages;
            // @ts-ignore
            strArr.forEach((value) => (message = message[value]));
            return message;
        };
    }
};
// testing dev plugin, when it is used in a form it is passed through install from system.ts(reference old form compontents)
// shall hardcode baseUrl uamApiUrl and paymentApiUrl, in form these urls are passed down from options
export const TestUrlPlugin = {
    install: (app) => {
        // these apis are setup using miraqe, under src/server.ts
        // maybe can use this same one, but if options was passed in then use it, otherwise use this one
        app.config.globalProperties.url = {
            baseApi: process.env.baseUrl,
            uamApi: process.env.uamApiUrl,
            paymentApi: process.env.paymentApiUrl,
            documentApi: process.env.documentUrl
        };
    }
};
if (process.env.NODE_ENV === 'development') {
    makeServer();
}
const app = createApp(App);
app.use(designSys);
// app.use(createPinia())
const requireComponent = import.meta.glob('./components/form-facilitator/design-system/*.vue');
Promise.all(Object.entries(requireComponent).map(([path, modulePromise]) => {
    const modulePath = path.slice(2); // Remove the leading './' from the path
    return modulePromise().then((module) => {
        // @ts-ignore
        const component = module.default;
        // Register the component globally or do something with it
        // console.log(component.__name);
        app.component(component.__name, component);
        return modulePath;
    });
})).then((modulePaths) => {
    // Use modulePaths if needed
    // console.log(modulePaths);
    app.use(store);
    app.use(LaPlugin);
    app.use(TestUrlPlugin);
    app.mount('#app');
});
