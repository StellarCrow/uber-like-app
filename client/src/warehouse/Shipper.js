import ShipperService from "../services/ShipperService";

const state = {
    shipper: {},
    loads: [],
    status: ""
};

const getters = {
    shippedLoads(state) {
        const posted = state.loads.filter(load => load.status === "SHIPPED");
        return posted.length;
    },
    assignedLoads(state) {
        const assigned = state.loads.filter(load => load.status === "ASSIGNED");
        return assigned.length;
    }
};

const actions = {
    async getShipperProfile({ commit }, id) {
        try {
            commit("get_shipper_profile_request");
            let res = await ShipperService.getFullProfile(id);
            const user = res.data.shipper;
            const shipper = {
                name: user.user.name,
                loadsCount: user.loads.length
            };
            commit("get_shipper_profile_success", { user, shipper });
            return { user: user };
        } catch (err) {
            commit("get_shipper_profile_failure");
            return { error: err };
        }
    },
    async addNewLoad({ commit }, { payload, shipperId }) {
        try {
            commit("add_load_request");
            const res = await ShipperService.createLoad(shipperId, payload);
            const load = res.data.load;
            commit("add_load_success", { load });
            return { load: load };
        } catch (err) {
            commit("add_load_failure");
            return { error: err };
        }
    },
    async updateLoad({ commit }, { shipperId, loadId, payload }) {
        try {
            commit("update_load_request");
            const res = await ShipperService.updateLoad(
                shipperId,
                loadId,
                payload
            );
            const load = res.data.load;
            commit("update_load_success", load);
            return { load: load };
        } catch (err) {
            commit("update_load_failure");
            return { error: err };
        }
    }
};

const mutations = {
    get_shipper_profile_request(state) {
        state.status = "loading";
    },
    get_shipper_profile_success(state, { user, shipper }) {
        state.status = "success";
        state.loads = user.loads;
        state.shipper = shipper;
    },
    get_shipper_profile_failure(state) {
        state.status = "";
    },
    add_load_request(state) {
        state.status = "loading";
    },
    add_load_success(state, { load }) {
        state.loads.push(load);
        state.shipper.loadsCount++;
        state.status = "success";
    },
    add_load_failure(state) {
        state.status = "";
    },
    update_load_request(state) {
        state.status = "loading";
    },
    update_load_success(state, updatedLoad) {
        const loadIndex = state.loads.findIndex(
            load => load._id === updatedLoad._id
        );
        if (loadIndex > -1) {
            state.loads[loadIndex] = updatedLoad;
        }
        state.status = "success";
    },
    update_load_failure(state) {
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
