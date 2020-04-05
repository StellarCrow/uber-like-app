import ShipperService from "../services/ShipperService";
import loadConstants from "../utils/loadConstants";
import Vue from "vue";
import mutation from "../utils/mutations";

const state = {
    shipper: {},
    loads: [],
    pagination: {},
    filter: "",
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
            commit(mutation.GET_SHIPPER_PROFILE_REQUEST);
            const res = await ShipperService.getFullProfile(id);
            const user = res.data.shipper;
            const shipper = {
                name: user.user.name,
                loadsCount: user.loads.length
            };
            commit(mutation.GET_SHIPPER__PROFILE_SUCCESS, { user, shipper });
            return { user: user };
        } catch (err) {
            commit(mutation.GET_SHIPPER__PROFILE_FAILURE);
            return { error: err };
        }
    },
    async addNewLoad({ commit }, { payload, shipperId }) {
        try {
            commit(mutation.ADD_LOAD_REQUEST);
            const res = await ShipperService.createLoad(shipperId, payload);
            const load = res.data.load;
            commit(mutation.ADD_LOAD_SUCCESS, { load });
            return { load: load };
        } catch (err) {
            commit(mutation.ADD_LOAD_FAILURE);
            return { error: err };
        }
    },
    async updateLoad({ commit }, { shipperId, loadId, payload }) {
        try {
            commit(mutation.UPDATE_LOAD_REQUEST);
            const res = await ShipperService.updateLoad(
                shipperId,
                loadId,
                payload
            );
            const load = res.data.load;
            commit(mutation.UPDATE_LOAD_SUCCESS, load);
            return { load: load };
        } catch (err) {
            commit(mutation.UPDATE_LOAD_FAILURE);
            return { error: err };
        }
    },
    async deleteLoad({ commit }, payload) {
        try {
            commit(mutation.DELETE_LOAD_REQUEST);
            const shipperId = payload.shipperId;
            const loadId = payload.loadId;
            const res = await ShipperService.deleteLoad(shipperId, loadId);
            const success = res.data.message;

            commit(mutation.DELETE_LOAD_SUCCESS, { loadId });
            return { load: success };
        } catch (err) {
            commit(mutation.DELETE_LOAD_FAILURE);
            return { error: err };
        }
    },
    async getLoadsList({ commit }, payload) {
        try {
            commit(mutation.GET_LOADS_REQUEST);
            const shipperId = payload.shipperId;
            const status = payload.status;
            const page = payload.page;
            const res = await ShipperService.getLoads(shipperId, status, page);
            const loads = res.data.loads;
            const pagination = res.data.meta.pagination;
            const filter = res.data.meta.filter;
            commit(mutation.GET_LOADS_SUCCESS, { loads, pagination, filter });
            return res;
        } catch (err) {
            commit(mutation.GET_LOADS_FAILURE);
            return { error: err };
        }
    },
    async postLoad({ commit }, payload) {
        try {
            commit(mutation.POST_LOAD_REQUEST);
            const shipperId = payload.shipperId;
            const loadId = payload.loadId;
            const res = await ShipperService.postLoad(shipperId, loadId);
            const load = res.data;
            commit(mutation.POST_LOAD_SUCCESS, { loadId });
            return { load };
        } catch (err) {
            commit(mutation.POST_LOAD_FAILURE);
            return { load: err };
        }
    },
    async deleteShipperAccount({ commit }, id) {
        try {
            commit(mutation.DELETE_ACCOUNT_REQUEST);
            const res = await ShipperService.deleteAccount(id);
            const user = res.data;
            commit(mutation.DELETE_ACCOUNT_SUCCESS);
            commit(mutation.LOGOUT, null, { root: true });
            return { user };
        } catch (err) {
            commit(mutation.DELETE_ACCOUNT_FAILURE);
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
    get_loads_request(state) {
        state.status = "loading";
    },
    get_loads_success(state, { loads, pagination, filter }) {
        state.loads = loads;
        state.pagination = pagination;
        state.filter = filter;
        state.status = "success";
    },
    get_loads_failure(state) {
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
        state.pagination = {};
        state.filter = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
