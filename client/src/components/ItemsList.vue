<template>
    <section class="items">
        <div class="items__title">My {{ this.title }}</div>
        <ul class="items__list">
            <li v-for="item in this.trucks" :key="item._id" class="items__list">
                <TruckItem class="items__item" :truck="item" />
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
        })
    },
    mounted() {
        if (this.role === "driver") {
            this.title = "Trucks";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_items-list.scss";
</style>
