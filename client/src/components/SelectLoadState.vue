<template>
    <div class="select-load">
        <select class="select select-load__select" v-model="loadState">
            <option
                v-for="(state, index) in this.states"
                :value="state"
                :key="index"
                >{{ state }}</option
            >
        </select>
        <div class="select-load__message">{{ message }}</div>
    </div>
</template>

<script>
import loadConstants from "../utils/loadConstants";
import { mapActions, mapState } from "vuex";

export default {
    name: "SelectLoadState",
    props: ["load"],
    data() {
        return {
            states: [],
            state: "",
            message: ""
        };
    },
    computed: {
        ...mapState({
            driverId: state => state.Auth.user.role_id
        }),
        loadState: {
            get() {
                return this.state;
            },
            async set(value) {
                this.state = value;
                const payload = {
                    driverId: this.driverId,
                    state: this.state
                };
                const message = await this.changeLoadState(payload);
                if (message) {
                    this.message = "Updated state";
                    setTimeout(() => {
                        this.message = "";
                    }, 2000);
                }
            }
        }
    },
    mounted() {
        this.state = this.load.state;
        const loadStates = loadConstants.loadState;
        for (const prop in loadStates) {
            this.states.push(loadStates[prop]);
        }
    },
    methods: {
        ...mapActions(["changeLoadState"])
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_select-load-state.scss";
</style>
