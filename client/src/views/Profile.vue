<template>
    <div class="profile">
        <div class="profile__row">
            <div class="profile__column">
                <div class="profile__info">
                    <ProfileDetails />
                </div>
                <div class="profile__optional">
                    <div class="feature profile__settings">
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
                    <div class="profile__weather">
                        <WeatherWidget />
                    </div>
                </div>
            </div>

            <div class="profile__items">
                <ItemsList />
            </div>
        </div>
        <div class="profile__row" v-if="load">
            <div class="profile__load">
                <div class="profile__title">Assigned Load</div>
                <LoadItem :load="this.load" />
            </div>
            <div class="profile__chat">
                <Messenger :room="this.load._id" />
            </div>
        </div>
        <div class="profile__row" v-if="isShipper">
            <div class="profile__contacts">
                <div class="profile__title">Discuss Assigned Loads</div>
                <ContactList @selectedDialog="getRoom" />
            </div>
            <div class="profile__chat">
                <Messenger
                    :room="this.room"
                    :contactName="this.contactName"
                    v-if="room"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDetails from "../components/ProfileDetails";
import ItemsList from "../components/ItemsList";
import LoadItem from "../components/LoadItem";
import WeatherWidget from "../components/WeatherWidget";
import Messenger from "../components/chat/Messenger";
import ContactList from "../components/chat/ContactList";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
    name: "Profile",
    components: {
        ProfileDetails,
        ItemsList,
        LoadItem,
        WeatherWidget,
        Messenger,
        ContactList
    },
    data() {
        return {
            room: "",
            contactName: ""
        };
    },
    computed: {
        ...mapState({
            role: state => state.Auth.role,
            load: state => state.Driver.assignedLoad
        }),
        ...mapGetters(["userId"]),
        isShipper() {
            return this.role === "shipper";
        }
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
        ]),
        getRoom(roomDetails) {
            this.room = roomDetails.loadId;
            this.contactName = roomDetails.name;
        }
    }
};
</script>

<style lang="scss">
@import "../styles/pages/_profile.scss";
</style>
