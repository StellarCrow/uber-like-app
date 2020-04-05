<template>
    <section class="items">
        <div class="items__group">
            <div class="items__title">My {{ this.title }}</div>
            <router-link to="/create" class="items__link">
                <button class="button button-transparent items__button">
                    Add new
                </button>
            </router-link>
        </div>
        <FilterLoads class="items__filter" v-if="isShipper" />
        <ul class="items__list" v-if="isDriver">
            <li v-for="item in this.trucks" :key="item._id" class="items__list">
                <TruckItem class="items__list-item" :truck="item" />
            </li>
        </ul>
        <Pagination :pager="pager" v-else>
            <ul class="items__list">
                <li
                    v-for="item in this.loads"
                    :key="item._id"
                    class="items__list"
                >
                    <LoadItem class="items__list-item" :load="item" />
                </li>
            </ul>
        </Pagination>
    </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TruckItem from "../components/TruckItem";
import LoadItem from "../components/LoadItem";
import FilterLoads from "../components/FilterLoads";
import Pagination from "../components/Pagination";

export default {
    name: "ItemsList",
    data() {
        return {
            title: "",
            filter: "",
            page: ""
        };
    },
    components: { TruckItem, LoadItem, FilterLoads, Pagination },
    computed: {
        ...mapState({
            trucks: state => state.Driver.trucks,
            loads: state => state.Shipper.loads,
            role: state => state.Auth.role,
            shipperId: state => state.Auth.user.role_id,
            pager: state => state.Shipper.pagination,
            filterStatus: state => state.Shipper.filter
        }),
        isDriver() {
            return this.role === "driver";
        },
        isShipper() {
            return this.role === "shipper";
        }
    },
    async mounted() {
        if (this.isDriver) {
            this.title = "Trucks";
        } else {
            this.title = "Loads";
            await this.sendRequestForLoads();
        }
    },
    methods: {
        ...mapActions(["getLoadsList"]),
        async sendRequestForLoads() {
            try {
                const payload = {
                    shipperId: this.shipperId,
                    status: this.filter,
                    page: this.page
                };
                await this.getLoadsList(payload);
            } catch (err) {
                console.log(err);
            }
        }
    },
    watch: {
        "$route.query": {
            async handler(query) {
                this.filter = query.filter || "";
                this.page = query.page || 1;
                this.sendRequestForLoads();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_items-list.scss";
</style>
