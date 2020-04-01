import ShipperService from "../services/ShipperService";
import loadConstants from "../utils/loadConstants";
import Vue from "vue";

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
    },
    async deleteLoad({ commit }, payload) {
        try {
            commit("delete_load_request");
            const shipperId = payload.shipperId;
            const loadId = payload.loadId;
            let res = await ShipperService.deleteLoad(shipperId, loadId);
            const success = res.data.message;

            commit("delete_load_success", { loadId });
            return { load: success };
        } catch (err) {
            commit("delete_load_failure");
            return { error: err };
        }
    },
    async postLoad({ commit }, payload) {
        try {
            commit("post_load_request");
            const shipperId = payload.shipperId;
            const loadId = payload.loadId;
            let res = await ShipperService.postLoad(shipperId, loadId);
            const load = res.data;
            commit("post_load_success", { loadId });
            return { load };
        } catch (err) {
            commit("post_load_failure");
            return { load: err };
        }
    },
    async deleteShipperAccount({ commit },id) {
        try {
            commit("delete_account_request");
            let res = await ShipperService.deleteAccount(id);
            const user = res.data;
            commit("delete_account_success");
            commit("logout", null, { root: true });
            return { user };
        } catch (err) {
            commit("delete_account_failure");
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
    },
    delete_load_request(state) {
        state.status = "loading";
    },
    delete_load_success(state, { loadId }) {
        const index = state.loads.findIndex(load => load._id === loadId);
        state.loads.splice(index, 1);
        state.shipper.loadsCount--;
        state.status = "success";
    },
    delete_load_failure(state) {
        state.status = "";
    },
    post_load_request(state) {
        state.status = "loading";
    },
    post_load_success(state, { loadId }) {
        const index = state.loads.findIndex(load => load._id === loadId);
        state.loads[index].status = loadConstants.loadStatus.ASSIGNED;
        Vue.set(
            state.loads[index],
            "state",
            loadConstants.loadState.EN_ROUTE_TO_PICK_UP
        );
        state.status = "success";
    },
    post_load_failure(state) {
        state.status = "";
    },
    delete_account_request(state) {
        state.status = "loading";
    },
    delete_account_success(state) {
        state.status = "success";
        state.shipper = {};
        state.loads = [];
    },
    delete_account_failure(state) {
        state.status = "";
    },
    clean_shipper(state) {
        state.shipper = {};
        state.loads = [];
        state.status = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
