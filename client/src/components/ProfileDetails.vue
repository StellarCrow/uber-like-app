<template>
    <section class="profile">
        <div class="profile__container">
            <div class="profile__avatar avatar">
                <img
                    alt="user-avatar"
                    src="../assets/defaults/avatar.svg"
                    class="avatar__img"
                />
            </div>
            <div class="profile__about">
                <div class="profile__name">{{ this.name }}</div>
                <div class="profile__role">{{ this.role }}</div>
                <ul
                    class="profile__info statistic"
                    v-if="this.role === 'driver'"
                >
                    <li class="statistic__item">Trucks<span>{{this.trucksCount}}</span></li>
                    <li class="statistic__item">Loads<span>{{this.load}}</span></li>
                    <li class="statistic__item">Assigned<span>{{this.assignedTruck}}</span></li>
                </ul>
                <button @click.prevent="logoutUser()" class="button">
                    Logout
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "ProfileDetails",
    data() {
        return {
            name: "",
            trucksCount: 0,
            load: 0,
            assignedTruck: 0,
        };
    },
    computed: {
        ...mapGetters(["role", "driver"])
    },
    mounted() {
        if (this.role === "driver") {
            this.name = this.driver.name;
            this.trucksCount = this.driver.trucksCount;
            this.load = this.driver.assignedLoad;
        }
    },
    methods: {
        ...mapActions(["logout"]),
        logoutUser() {
            this.logout();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_profile-details.scss";
</style>