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
    },
    deleteLoad(shipperId, loadId) {
        return Api().delete(`/api/shippers/${shipperId}/loads/${loadId}`);
    },
    postLoad(shipperId, loadId) {
        return Api().post(`/api/shippers/${shipperId}/loads/${loadId}`);
    },
    deleteAccount(id) {
        return Api().delete(`/api/shippers/${id}`);
    },
    getLoads(id, status) {
        if(status) {
            return Api().get(`/api/shippers/${id}/loads/?filter=${status}`);
        } else {
            return Api().get(`/api/shippers/${id}/loads/`);
        }
        
    }
};
