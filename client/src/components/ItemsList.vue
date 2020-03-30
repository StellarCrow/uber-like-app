<template>
    <section class="items">
        <div class="items__title">My {{ this.title }}</div>
        <ul class="items__list">
            <li v-for="item in this.items" :key="item._id" class="items__list">
                <TruckItem class="items__item" :truck="item" />
            </li>
        </ul>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import TruckItem from "../components/TruckItem";

export default {
    name: "ItemsList",
    data() {
        return {
            title: "",
            items: []
        };
    },
    components: { TruckItem },
    computed: {
        ...mapGetters(["role", "trucks"])
    },
    mounted() {
        if (this.role === "driver") {
            this.title = "Trucks";
            this.items = this.trucks;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_items-list.scss";
</style>
