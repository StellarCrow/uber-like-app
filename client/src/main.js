import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

//Setting up default vue's http modules for api calls
Vue.prototype.$http = axios;
//load the token from the LocalStorage
const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "JWT " + token;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
