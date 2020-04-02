import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "../warehouse/Auth";
import Driver from "../warehouse/Driver";
import Shipper from "../warehouse/Shipper";
// import User from "../warehouse/User";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {},
    mutations: {},
    actions: {},
    modules: { Auth, Shipper, Driver }
});
