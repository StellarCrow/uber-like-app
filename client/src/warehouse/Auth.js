import AuthenticationService from "../services/AuthenticationService";
import axios from "axios";
import router from "../router/index";

const state = {
    token: localStorage.getItem("token") || "",
    user: {},
    role: "",
    status: ""
};

const getters = {
    isAuthenticated: state => !!state.token,
    userId: state => state.user.role_id
};

const actions = {
    async login({ commit }, user) {
        try {
            let res = await AuthenticationService.login(user);
            commit("auth_request");
            if (res.data.user) {
                const token = res.data.token;
                let user = res.data.user;
                localStorage.setItem("token", token);
                //Set axios defaults
                axios.defaults.headers.common["Authorization"] = "JWT " + token;
                commit("auth_success", { token, user });
            }
            return { user: user };
        } catch (err) {
            return { error: err };
        }
    },
    //Registration
    async register({ commit }, userData) {
        try {
            commit("register_request");
            let res = await AuthenticationService.register(userData);
            const user = res.data.user;
            commit("register_success");
            return { user: user };
        } catch (err) {
            return { error: err };
        }
    },
    //Logout the user
    async logout({ commit }) {
        await localStorage.removeItem("token");
        commit("logout");
        commit("clean_shipper", null, { root: true });
        commit("clean_driver", null, { root: true });
        delete axios.defaults.headers.common["Authorization"];
        router.push("/");
        return;
    },

    async updatePassword({ commit }, payload) {
        try {
            const userId = payload.id;
            const password = payload.password;
            commit("update_password_request");
            let res = await AuthenticationService.updatePassword(
                userId,
                password
            );
            const message = res.data.message;
            commit("update_password_success");
            return { message: message };
        } catch (err) {
            return { error: err };
        }
    }
};

const mutations = {
    auth_request(state) {
        state.status = "loading";
    },
    auth_success(state, { token, user }) {
        state.token = token;
        state.user = user;
        state.status = "success";
        state.role = user.role;
    },
    register_request(state) {
        state.status = "loading";
    },
    register_success(state) {
        state.status = "success";
    },
    logout(state) {
        state.status = "";
        state.token = "";
        state.user = "";
        state.role = "";
    },
    update_password_request(state) {
        state.status = "loading";
    },
    update_password_success(state) {
        state.status = "success";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
