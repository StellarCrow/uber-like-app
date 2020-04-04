import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";
import axios from "axios";
import router from "../router/index";
import mutation from "../utils/mutations";

const state = {
    token: localStorage.getItem("token") || "",
    user: {},
    role: "",
    status: ""
};

const getters = {
    isAuthenticated: state => !!state.token,
    userId: state => state.user.role_id,
    avatar: state => state.user.avatar
};

const actions = {
    async login({ commit }, user) {
        try {
            const res = await AuthenticationService.login(user);
            commit(mutation.AUTH_REQUEST);
            if (res.data.user) {
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem("token", token);
                //Set axios defaults
                axios.defaults.headers.common["Authorization"] = "JWT " + token;
                commit(mutation.AUTH_SUCCESS, { token, user });
            }
            return { user: user };
        } catch (err) {
            return { error: err };
        }
    },
    //Registration
    async register({ commit }, userData) {
        try {
            commit(mutation.REGISTER_REQUEST);
            const res = await AuthenticationService.register(userData);
            const user = res.data.user;
            commit(mutation.REGISTER_SUCCESS);
            return { user: user };
        } catch (err) {
            return { error: err };
        }
    },
    //Logout the user
    async logout({ commit }) {
        await localStorage.removeItem("token");
        commit(mutation.LOGOUT);
        commit(mutation.CLEAN_SHIPPER, null, { root: true });
        commit(mutation.CLEAN_DRIVER, null, { root: true });
        delete axios.defaults.headers.common["Authorization"];
        router.push("/");
        return;
    },

    async updatePassword({ commit }, payload) {
        try {
            const userId = payload.id;
            const password = payload.password;
            commit(mutation.UPDATE_PASSWORD_REQUEST);
            const res = await UserService.updatePassword(userId, password);
            const message = res.data.message;
            commit(mutation.UPDATE_PASSWORD_SUCCESS);
            return { message: message };
        } catch (err) {
            return { error: err };
        }
    },
    async updateAvatar({ commit }, payload) {
        try {
            commit(mutation.UPDATE_AVATAR_REQUEST);
            const id = payload.userId;
            const image = payload.imageFile;
            const res = await UserService.updateAvatar(id, image);
            if (res.data.image) {
                const image = res.data.image;
                commit(mutation.UPDATE_AVATAR_SUCCESS, image);
                return res.data;
            }
        } catch (err) {
            commit(mutation.UPDATE_AVATAR_FAILURE);
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
    },
    update_avatar_request(state) {
        state.status = "loading";
    },
    update_avatar_success(state, avatar) {
        state.user.avatar = avatar;
        state.status = "success";
    },
    update_avatar_failure(state) {
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
