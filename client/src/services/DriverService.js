import Api from "./Api";

export default {
    getFullProfile(id) {
        return Api().get(`/api/drivers/${id}`);
    },
    assignTruck(driverId, truckId) {
        return Api().patch(`/api/drivers/${driverId}/trucks/${truckId}`);
    },
    deleteTruck(driverId, truckId) {
        return Api().delete(`/api/drivers/${driverId}/trucks/${truckId}`);
    },
    createTruck(driverId, body) {
        return Api().post(`/api/drivers/${driverId}/trucks/`, body);
    },
    updateTruck(driverId, truckId, body) {
        return Api().put(`/api/drivers/${driverId}/trucks/${truckId}`, body);
    },
    getLoad(driverId) {
        return Api().get(`/api/drivers/${driverId}/loads`);
    }
};
