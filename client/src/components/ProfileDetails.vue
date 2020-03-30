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
                <ul class="profile__info statistic">
                    <li class="statistic__item">Trucks<span>10</span></li>
                    <li class="statistic__item">Loads<span>10</span></li>
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
            name: ""
        };
    },
    computed: {
        ...mapGetters(["role", "user"])
    },
    mounted() {
        this.name = this.user.name;
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
