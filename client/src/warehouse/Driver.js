import DriverService from "../services/DriverService";
import mutation from "../utils/mutations";

const state = {
    driver: {},
    trucks: [],
    assignedTruck: null,
    assignedLoad: null,
    status: ""
};

const getters = {};

const actions = {
    async getDriverProfile({ commit }, id) {
        try {
            commit(mutation.GET_DRIVER_PROFILE_REQUEST);
            const res = await DriverService.getFullProfile(id);
            const user = res.data.driver;
            const driver = {
                name: user.user.name,
                trucksCount: user.trucks.length,
                assignedTruck: user.assigned_truck ? 1 : 0,
                assignedLoad: user.load ? 1 : 0,
                hasLoad: user.has_load
            };
            commit(mutation.GET_DRIVER_PROFILE_SUCCESS, { user, driver });
            return { user: user };
        } catch (err) {
            commit(mutation.GET_DRIVER_PROFILE_FAILURE);
            return { error: err };
        }
    },

    async assignTruck({ commit }, payload) {
        try {
            commit(mutation.ASSIGN_TRUCK_REQUEST);
            const driverId = payload.driverId;
            const truckId = payload.truckId;
            const res = await DriverService.assignTruck(driverId, truckId);
            const assignedTruck = res.data.truck;

            commit(mutation.ASSIGN_TRUCK_SUCCESS, { truckId });
            return { truck: assignedTruck };
        } catch (err) {
            commit(mutation.ASSIGN_TRUCK_FAILURE);
            return { error: err };
        }
    },
    async deleteTruck({ commit }, payload) {
        try {
            commit(mutation.DELETE_TRUCK_REQUEST);
            const driverId = payload.driverId;
            const truckId = payload.truckId;
            const res = await DriverService.deleteTruck(driverId, truckId);
            const success = res.data.message;

            commit(mutation.DELETE_TRUCK_SUCCESS, { truckId });
            return { truck: success };
        } catch (err) {
            commit(mutation.DELETE_TRUCK_FAILURE);
            return { error: err };
        }
    },
    async addNewTruck({ commit }, payload) {
        try {
            commit(mutation.ADD_TRUCK_REQUEST);
            const driverId = payload.driverId;
            const body = { name: payload.name, type: payload.type };
            const res = await DriverService.createTruck(driverId, body);
            const truck = res.data.truck;
            commit(mutation.ADD_TRUCK_SUCCESS, { truck });
            return { truck: truck };
        } catch (err) {
            commit(mutation.ADD_TRUCK_FAILURE);
            return { error: err };
        }
    },
    async updateTruck({ commit }, payload) {
        try {
            commit(mutation.UPDATE_TRUCK_REQUEST);
            const driverId = payload.driverId;
            const truckId = payload.truckId;
            const body = { name: payload.name };
            const res = await DriverService.updateTruck(
                driverId,
                truckId,
                body
            );
            const truck = res.data.truck;
            commit(mutation.UPDATE_TRUCK_SUCCESS, truck);
            return { truck: truck };
        } catch (err) {
            commit(mutation.UPDATE_TRUCK_FAILURE);
            return { error: err };
        }
    },
    async getAssignedLoad({ commit }, id) {
        try {
            commit(mutation.GET_ASSIGNED_LOAD_REQUEST);
            const res = await DriverService.getLoad(id);
            const load = res.data.load;
            commit(mutation.GET_ASSIGNED_LOAD_SUCCESS, { load });
            return load;
        } catch (err) {
            commit(mutation.GET_ASSIGNED_LOAD_FAILURE);
            return { error: err };
        }
    },
    async changeLoadState({ commit }, { driverId, state }) {
        try {
            commit(mutation.CHANGE_LOAD_STATE_REQUEST);
            const body = { state: state };
            const res = await DriverService.changeLoadState(driverId, body);
            const message = res.data.message;
            commit(mutation.CHANGE_LOAD_STATE_SUCCESS, state);
            return message;
        } catch (err) {
            commit(mutation.CHANGE_LOAD_STATE_FAILURE);
            return { error: err };
        }
    }
};

const mutations = {
    get_driver_profile_request(state) {
        state.status = "loading";
    },
    get_driver_profile_success(state, { user, driver }) {
        state.status = "success";
        state.trucks = user.trucks;
        state.assignedLoad = user.load || null;
        state.assignedTruck = user.assigned_truck || null;
        state.driver = driver;
    },
    get_driver_profile_failure(state) {
        state.status = "";
    },
    assign_truck_request(state) {
        state.status = "loading";
    },
    assign_truck_success(state, { truckId }) {
        const oldAssignedTruckIndex = state.trucks.findIndex(
            truck => truck._id === state.assignedTruck
        );

        if (oldAssignedTruckIndex > -1) {
            state.trucks[oldAssignedTruckIndex].status = "FREE";
        }
        const newAssignedTruckIndex = state.trucks.findIndex(
            truck => truck._id === truckId
        );
        state.trucks[newAssignedTruckIndex].status = "IS";
        state.assignedTruck = truckId;
        state.driver.assignedTruck = 1;
        state.status = "success";
    },
    assign_truck_failure(state) {
        state.status = "";
    },
    delete_truck_request(state) {
        state.status = "loading";
    },
    delete_truck_success(state, { truckId }) {
        state.status = "success";
        const index = state.trucks.findIndex(truck => truck._id === truckId);
        state.trucks.splice(index, 1);
        state.driver.trucksCount--;
    },
    delete_truck_failure(state) {
        state.status = "";
    },
    add_truck_request(state) {
        state.status = "loading";
    },
    add_truck_success(state, { truck }) {
        state.status = "success";
        state.trucks.push(truck);
        state.driver.trucksCount++;
    },
    add_truck_failure(state) {
        state.status = "";
    },
    update_truck_request(state) {
        state.status = "loading";
    },
    update_truck_success(state, updatedTruck) {
        const truckIndex = state.trucks.findIndex(
            truck => truck._id === updatedTruck._id
        );
        if (truckIndex > -1) {
            state.trucks[truckIndex] = updatedTruck;
        }
        state.status = "success";
    },
    update_truck_failure(state) {
        state.status = "";
    },
    get_assigned_load_request(state) {
        state.status = "loading";
    },
    get_assigned_load_success(state, { load }) {
        state.assignedLoad = load;
        state.status = "success";
    },
    get_assigned_load_failure(state) {
        state.status = "";
    },
    change_load_state_request(state) {
        state.status = "loading";
    },
    change_load_state_success(state, loadState) {
        state.assignedLoad.state = loadState;
        state.status = "success";
    },
    change_load_state_failure(state) {
        state.status = "";
    },
    clean_driver(state) {
        state.driver = {};
        state.trucks = [];
        state.assignedTruck = null;
        state.assignedLoad = null;
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
