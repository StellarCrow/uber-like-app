<template>
    <div class="truck">
        <div class="truck__description">
            <div class="truck__item feature">
                <div class="feature__name">Name</div>
                <div class="feature__value truck__name">
                    {{ this.truck.name }}
                </div>
            </div>
            <div class="truck__item feature">
                <div class="feature__name">Type</div>
                <div class="feature__value truck__type">
                    {{ this.type }}
                </div>
            </div>
            <div class="truck__item feature">
                <div class="feature__name">Status</div>
                <div
                    class="feature__value truck__status"
                    :class="this.addClass"
                >
                    {{ this.status }}
                </div>
            </div>
            <div class="truck__item feature" v-if="this.isAssigned">
                <div class="feature__name">Assigned</div>
                <div class="feature__value truck__assigned">
                    Assigned
                </div>
            </div>
        </div>
        <div class="truck__buttons" v-if="!this.assignedLoad">
            <button
                @click.prevent="assignTruckToDriver()"
                class="button button--assign"
                v-if="!this.isAssigned"
            >
                Assign
            </button>
            <button class="button" v-if="!this.isAssigned">Modify</button>
            <button
                @click="deleteTruckFromList()"
                class="button button--delete"
                v-if="!this.isAssigned"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import truckConstants from "../utils/truckConstants";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
    name: "TruckItem",
    props: ["truck"],
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["userId"]),
        ...mapState({
            assignedTruck: state => state.Driver.assignedTruck,
            assignedLoad: state => state.Driver.assignedLoad
        }),
        addClass() {
            if (this.truck.status === "FREE") {
                return "truck__status--free";
            } else if (this.truck.status === "OL") {
                return "truck__status--ol";
            } else if (this.truck.status === "IS") {
                return "truck__status--is";
            } else return "";
        },
        status() {
            const truckStatus = truckConstants.truckStatus;
            return truckStatus[this.truck.status];
        },
        type() {
            const truckTypes = truckConstants.type;
            return truckTypes[this.truck.type].name;
        },
        isAssigned() {
            return this.truck._id === this.assignedTruck;
        }
    },
    mounted() {},
    methods: {
        ...mapActions(["assignTruck", "deleteTruck"]),
        async assignTruckToDriver() {
            try {
                const payload = {
                    driverId: this.userId,
                    truckId: this.truck._id
                };
                await this.assignTruck(payload);
            } catch (err) {
                console.log(err);
            }
        },
        async deleteTruckFromList() {
            try {
                const payload = {
                    driverId: this.userId,
                    truckId: this.truck._id
                };
                const res = await this.deleteTruck(payload);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_truck-item.scss";
</style>
