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

export default {
    name: "Profile",
    components: { ProfileDetails },
    data() {
        return {
            name: "",
            role: ""
        };
    }
};
</script>

<style lang="scss">
@import "../styles/pages/_profile.scss";
</style>
