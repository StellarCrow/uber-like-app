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
    }
};
