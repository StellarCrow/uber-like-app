<template>
    <div class="filter">
        <div class="filter__title">Filter</div>
        <ul class="filter__list">
            <li class="filter__item">
                <input
                    type="radio"
                    id="all"
                    v-model="loadStatus"
                    value="all"
                    class="filter__radio"
                    checked
                />
                <label class="filter__label" for="all">All</label>
            </li>
            <li
                class="filter__item"
                v-for="(status, index) in this.statuses"
                :key="index"
            >
                <input
                    type="radio"
                    :id="status"
                    v-model="loadStatus"
                    :value="status"
                    class="filter__radio"
                />
                <label class="filter__label" :for="status">{{ status }}</label>
            </li>
        </ul>
    </div>
</template>

<script>
import loadConstants from "../utils/loadConstants";
import { mapActions, mapState } from "vuex";

export default {
    name: "FilterLoads",
    data() {
        return {
            statuses: [],
            status: ""
        };
    },
    computed: {
        ...mapState({
            shipperId: state => state.Auth.user.role_id
        }),
        loadStatus: {
            get() {
                return this.status === "" ? "all" : this.status;
            },
            async set(value) {
                this.status = value;
                this.$router.push({ query: { filter: this.status } });
            }
        }
    },
    mounted() {
        this.statuses = loadConstants.loadStatus;
    },
    methods: {
        ...mapActions(["getLoadsList"])
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_filter-loads.scss";
</style>
