import DriverService from "../services/DriverService";

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
            commit("get_driver_profile_request");
            let res = await DriverService.getFullProfile(id);
            const user = res.data.driver;
            const driver = {
                name: user.user.name,
                trucksCount: user.trucks.length,
                assignedTruck: user.assigned_truck ? 1 : 0,
                assignedLoad: user.load ? 1 : 0,
                hasLoad: user.has_load
            };
            commit("get_driver_profile_success", { user, driver });
            return { user: user };
        } catch (err) {
            commit("get_driver_profile_failure");
            return { error: err };
        }
    },

    async assignTruck({ commit }, payload) {
        try {
            commit("assign_truck_request");
            const driverId = payload.driverId;
            const truckId = payload.truckId;
            let res = await DriverService.assignTruck(driverId, truckId);
            const assignedTruck = res.data.truck;

            commit("assign_truck_success", { truckId });
            return { truck: assignedTruck };
        } catch (err) {
            commit("assign_truck_failure");
            return { error: err };
        }
    },
    async deleteTruck({ commit }, payload) {
        try {
            commit("delete_truck_request");
            const driverId = payload.driverId;
            const truckId = payload.truckId;
            let res = await DriverService.deleteTruck(driverId, truckId);
            const success = res.data.message;

            commit("delete_truck_success", { truckId });
            return { truck: success };
        } catch (err) {
            commit("delete_truck_failure");
            return { error: err };
        }
    },
    async addNewTruck({ commit }, payload) {
        try {
            commit("add_truck_request");
            const driverId = payload.driverId;
            const body = { name: payload.name, type: payload.type };
            const res = await DriverService.createTruck(driverId, body);
            const truck = res.data.truck;
            commit("add_truck_success", { truck });
            return { truck: truck };
        } catch (err) {
            commit("add_truck_failure");
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
