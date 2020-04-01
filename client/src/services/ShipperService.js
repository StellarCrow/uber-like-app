import Api from "./Api";

export default {
    getFullProfile(id) {
        return Api().get(`/api/shippers/${id}`);
    },
    createLoad(shipperId, body) {
        return Api().post(`/api/shippers/${shipperId}/loads/`, body);
    },
    updateLoad(shipperId, loadId, body) {
        return Api().put(`/api/shippers/${shipperId}/loads/${loadId}`, body);
    }
};