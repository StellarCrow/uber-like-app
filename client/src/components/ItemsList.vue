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
        <ul class="items__list">
            <li v-for="item in this.trucks" :key="item._id" class="items__list">
                <TruckItem class="items__item" :truck="item" v-if="isDriver"/>
            </li>
        </ul>
    </section>
</template>

<script>
import { mapState } from "vuex";
import TruckItem from "../components/TruckItem";

export default {
    name: "ItemsList",
    data() {
        return {
            title: ""
        };
    },
    components: { TruckItem },
    computed: {
        ...mapState({
            trucks: state => state.Driver.trucks,
            role: state => state.Auth.role
        }),
        isDriver() {
            return this.role === "driver"
        }
    },
    mounted() {
        if (this.isDriver) {
            this.title = "Trucks";
        } else this.title = "Loads"
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_items-list.scss";
</style>
