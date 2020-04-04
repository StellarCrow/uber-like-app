import Api from "./Api";

export default {
    updatePassword(id, password) {
        return Api().patch(`/api/users/${id}`, { password: password });
    },
    updateAvatar(id, image) {
        return Api().post(`/api/users/${id}/avatar`, image);
    }
};
