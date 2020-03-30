import DriverService from "../services/DriverService";

const state = {
    driver: {},
    trucks: [],
    assignedTruck: {},
    assignedLoad: {},
    status: ""
};

const getters = {
    driver: state => state.driver,
    trucks: state => state.trucks,
    assignedTruck: state => state.truck,
    assignedLoad: state => state.assignedLoad
};

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
                assignedLoad: user.assigned_load ? 1 : 0,
                hasLoad: user.has_load
            };
            commit("get_driver_profile_success", { user, driver });
            return { user: user };
        } catch (err) {
            commit("get_driver_profile_failure");
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
        state.assignedLoad = user.assigned_load || {};
        state.assignedTruck = user.assigned_truck || {};
        state.driver = driver;
    },
    get_driver_profile_failure(state) {
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
