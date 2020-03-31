<template>
    <div class="profile">
        <div class="profile__column">
            <div class="profile__info">
                <ProfileDetails />
            </div>
            <div class="profile__optional">
                <div class="feature">
                    <div class="feature__name">Settings</div>
                    <div class="feature__value">
                        <router-link class="profile__link" to="/settings"
                            ><img
                                src="../assets/icons/settings.svg"
                                class="profile__settings-image"
                                alt="Settings"
                        /></router-link>
                    </div>
                </div>
                <div class="profile__weather"></div>
            </div>
            <div class="profile__load"></div>
        </div>

        <div class="profile__items">
            <ItemsList />
        </div>
    </div>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import ItemsList from "../components/ItemsList";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    name: "Profile",
    components: { ProfileDetails, ItemsList },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            role: state => state.Auth.role
        }),
        ...mapGetters(["userId"])
    },
    async mounted() {
        try {
            if (this.role === "driver") {
                await this.getDriverProfile(this.userId);
            } else {
                await this.getShipperProfile(this.userId);
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        ...mapActions(["getDriverProfile", "getShipperProfile"])
    }
};
</script>

<style lang="scss">
@import "../styles/pages/_profile.scss";
</style>
