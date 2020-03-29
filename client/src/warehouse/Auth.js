import AuthenticationService from "../services/AuthenticationService"
import axios from "axios"
import router from "../router/index"

const state = {
    token: localStorage.getItem("token") || "",
    user: {},
    status: ""
}

const getters = {
    isAuthenticated: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    userId: state => state.user._id
}

const actions = {
    async login({ commit }, user) {
        try {
            let res = await AuthenticationService.login(user)
            commit("auth_request")
            if(res.data.user) {
                const token = res.data.token
                let user = res.data.user
                localStorage.setItem("token", token)
                //Set axios defaults
                axios.defaults.headers.common["Authorization"] = token
                commit("auth_success", { token, user })
            }
            return res
        } catch (err) {
            return err;
        }
    },
    //Registration
    async register({ commit }, userData) {
        try {
            commit("register_request")
            let res = await AuthenticationService.register(userData)
            const token = res.data.token
            const user = res.data.user
            localStorage.setItem("token", token)
            //Set axios defaults
            axios.defaults.headers.common["Authorization"] = token

            commit("register_success", { token, user })
            return res
        } catch (err) {}
    },
    //Logout the user
    async logout({ commit }) {
        await localStorage.removeItem("token")
        commit("logout")
        delete axios.defaults.headers.common["Authorization"]
        router.push("/")
        return
    }
}

const mutations = {
    auth_request(state) {
        state.status = "loading"
    },
    auth_success(state, { token, user }) {
        state.token = token
        state.user = user
        state.status = "success"
    },
    register_request(state) {
        state.status = "loading"
    },
    register_success(state, { token, user }) {
        state.token = token
        state.user = user
        state.status = "success"
    },
    logout(state) {
        state.status = ""
        state.token = ""
        state.user = ""
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
