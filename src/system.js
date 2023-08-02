import FormFacilitator from './components/form-facilitator/FormFacilitator.vue';
import FormHeader from './components/header/FormHeader.vue';
export default {
    install(app) {
        app.component('form-facilitator', FormFacilitator);
        app.component('form-header', FormHeader);
    }
};
