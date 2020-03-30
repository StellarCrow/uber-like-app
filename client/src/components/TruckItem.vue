<template>
    <div class="truck">
        <div class="truck__description">
            <div class="truck__item feature">
                <div class="feature__name">Name</div>
                <div class="feature__value truck__name">
                    {{ this.name }}
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
        <div class="truck__buttons" v-if="!this.driverHasAssignedLoad">
            <button class="button button--assign" v-if="!this.isAssigned">
                Assign
            </button>
            <button class="button" v-if="!this.isAssigned">Modify</button>
            <button class="button button--delete" v-if="!this.isAssigned">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import truckConstants from "../utils/truckConstants";
import { mapGetters } from "vuex";

export default {
    name: "TruckItem",
    props: ["truck"],
    data() {
        return {
            name: "",
            status: "",
            type: "",
            driverHasAssignedTruck: false,
            driverHasAssignedLoad: false,
            isAssigned: false
        };
    },
    computed: {
        ...mapGetters(["assignedLoad", "assignedTruck"]),
        addClass() {
            if (this.truck.status === "FREE") {
                return "truck__status--free";
            } else if (this.truck.status === "OL") {
                return "truck__status--ol";
            } else if (this.truck.status === "IS") {
                return "truck__status--is";
            } else return "";
        }
    },
    mounted() {
        const type = truckConstants.type;
        const truckStatus = truckConstants.truckStatus;
        this.name = this.truck.name;
        this.status = truckStatus[this.truck.status];
        this.type = type[this.truck.type].name;
        this.isAssigned = this.truck._id === this.assignedTruck;
        this.driverHasAssignedTruck = !!this.assignedTruck;
        this.driverHasAssignedLoad = !!this.assignedLoad;
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_truck-item.scss";
</style>
