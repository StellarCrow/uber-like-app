<template>
    <div class="profile">
        <div class="profile__column">
            <div class="profile__info">
                <ProfileDetails />
            </div>
            <div class="profile__load"></div>
        </div>

        <div class="profile__items"></div>
    </div>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Profile",
    components: { ProfileDetails },
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(["userId", "role"])
    },
    async mounted() {
        try {
            if (this.role === "driver") {
                await this.getDriverProfile(this.userId);
            } else {
                console.log("shipper");
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        ...mapActions(["getDriverProfile"])
    }
};
</script>

<style lang="scss">
@import "../styles/pages/_profile.scss";
</style>
