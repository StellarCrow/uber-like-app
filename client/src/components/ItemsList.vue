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
        <ul class="items__list" v-if="isDriver">
            <li v-for="item in this.trucks" :key="item._id" class="items__list">
                <TruckItem class="items__item" :truck="item" />
            </li>
        </ul>
        <ul class="items__list" v-else>
            <li v-for="item in this.loads" :key="item._id" class="items__list">
                <LoadItem class="items__item" :load="item" />
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState } from "vuex";
import TruckItem from "../components/TruckItem";
import LoadItem from "../components/LoadItem";

export default {
    name: "ItemsList",
    data() {
        return {
            title: ""
        };
    },
    components: { TruckItem, LoadItem },
    computed: {
        ...mapState({
            trucks: state => state.Driver.trucks,
            loads: state => state.Shipper.loads,
            role: state => state.Auth.role
        }),
        isDriver() {
            return this.role === "driver";
        }
    },
    mounted() {
        if (this.isDriver) {
            this.title = "Trucks";
        } else this.title = "Loads";
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_items-list.scss";
</style>
