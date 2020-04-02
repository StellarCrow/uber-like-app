<template>
    <div class="profile">
        <div class="profile__row">
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
            </div>

            <div class="profile__items">
                <ItemsList />
            </div>
        </div>
        <div class="profile__row">
            <div class="profile__load" v-if="load">
                <div class="profile__title">Assigned Load</div>
                <LoadItem :load="load" />
            </div>
            <div class="profile__chat"></div>
        </div>
    </div>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import ItemsList from "../components/ItemsList";
import LoadItem from "../components/LoadItem";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    name: "Profile",
    components: { ProfileDetails, ItemsList, LoadItem },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            role: state => state.Auth.role,
            load: state => state.Driver.assignedLoad
        }),
        ...mapGetters(["userId"])
    },
    async mounted() {
        try {
            if (this.role === "driver") {
                await this.getDriverProfile(this.userId);
                if (this.load) {
                    await this.getAssignedLoad(this.userId);
                }
            } else {
                await this.getShipperProfile(this.userId);
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        ...mapActions([
            "getDriverProfile",
            "getShipperProfile",
            "getAssignedLoad"
        ])
    }
};
</script>

<style lang="scss">
@import "../styles/pages/_profile.scss";
</style>
