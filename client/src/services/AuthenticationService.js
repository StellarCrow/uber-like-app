import Api from "./Api";

export default {
    register(credentials) {
        return Api().post("/api/users/", credentials);
    },
    login(user) {
        return Api().post("/api/login", user);
    }
};
