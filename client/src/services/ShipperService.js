import Api from "./Api";

export default {
    getFullProfile(id) {
        return Api().get(`/api/shippers/${id}`);
    }
};
