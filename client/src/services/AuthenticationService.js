import Api from "./Api";

export default {
    register(credentials) {
        return Api().post("/api/users/", credentials);
    },
    login(user) {
        return Api().post("/api/users/login", user);
    },
    updatePassword(id, password) {
        return Api().patch(`/api/users/${id}`, {password: password});
    }
};
