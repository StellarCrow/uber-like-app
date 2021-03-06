<template>
    <section class="profile">
        <div class="profile__container">
            <div class="profile__avatar avatar">
                <img alt="user-avatar" :src="avatarSrc" class="avatar__img" />
            </div>
            <div class="profile__about">
                <div class="profile__name">{{ this.name }}</div>
                <div class="profile__role">{{ this.role }}</div>
                <ul
                    class="profile__info statistic"
                    v-if="this.role === this.roles.DRIVER"
                >
                    <li class="statistic__item">
                        Trucks<span>{{ this.trucksCount }}</span>
                    </li>
                    <li class="statistic__item">
                        Loads<span>{{ this.load }}</span>
                    </li>
                    <li class="statistic__item">
                        Assigned Truck<span>{{ this.assignedTruck }}</span>
                    </li>
                </ul>
                <ul
                    class="profile__info statistic"
                    v-else-if="this.role === 'shipper'"
                >
                    <li class="statistic__item">
                        Loads<span>{{ loadsCount }}</span>
                    </li>
                    <li class="statistic__item">
                        Assigned<span>{{ assignedLoads }}</span>
                    </li>
                    <li class="statistic__item">
                        Shipped<span>{{ shippedLoads }}</span>
                    </li>
                </ul>
                <button
                    @click.prevent="logoutUser()"
                    class="profile__button button"
                >
                    Logout
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { role as roles, defaultAvatar } from "../utils/constants";

export default {
    name: "ProfileDetails",
    data() {
        return {
            roles: roles,
            publicPath: process.env.BASE_URL
        };
    },
    computed: {
        ...mapGetters(["shippedLoads", "assignedLoads", "avatar"]),
        ...mapState({
            role: state => state.Auth.role,
            driver: state => state.Driver.driver,
            shipper: state => state.Shipper.shipper,
            name: state => state.Auth.user.name
        }),
        trucksCount() {
            return this.driver.trucksCount;
        },
        loadsCount() {
            return this.shipper.loadsCount;
        },
        load() {
            return this.driver.assignedLoad;
        },
        assignedTruck() {
            return this.driver.assignedTruck;
        },
        avatarSrc() {
            if (this.avatar) {
                return this.avatar;
            } else {
                return `${this.publicPath}${defaultAvatar}`;
            }
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
