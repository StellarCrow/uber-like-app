<template>
    <div class="truck">
        <div class="truck__body">
            <div class="truck__description">
                <div class="truck__item feature">
                    <div class="feature__name">Name</div>
                    <div class="feature__value truck__name">
                        {{ name }}
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
                <button
                    class="button"
                    @click.prevent="showDetails = !showDetails"
                >
                    Show details
                </button>
                <button
                    @click="deleteTruckFromList()"
                    class="button button--delete"
                    v-if="!this.isAssigned"
                >
                    Delete
                </button>
            </div>
        </div>
        <div class="truck__details" v-if="showDetails">
            <div class="truck__details-list">
                <div class="detail">
                    <div class="detail__name">Name</div>
                    <div class="detail__value">
                        <input
                            class="detail__input"
                            type="text"
                            v-model="name"
                            placeholder="Truck name"
                            :disabled="this.isAssigned"
                            maxlength="30"
                            required
                        />
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Payload</div>
                    <div class="detail__value">{{ this.truck.payload }}</div>
                </div>
                <div class="detail">
                    <div class="detail__name">Dimensions</div>
                    <div class="detail__value detail__value--horizontal">
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Width
                            </div>
                            <div class="feature__value">
                                {{ this.truck.dimensions.width }}
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Length
                            </div>
                            <div class="feature__value">
                                {{ this.truck.dimensions.length }}
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Height
                            </div>
                            <div class="feature__value">
                                {{ this.truck.dimensions.height }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="truck__update">
                <button
                    class="button"
                    v-if="!this.isAssigned"
                    @click="updateTruckInfo()"
                >
                    Update info
                </button>
                <div class="truck__message">{{ updatedMessage }}</div>
            </div>
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
        return {
            name: "",
            showDetails: false,
            updatedMessage: ""
        };
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
    mounted() {
        this.name = this.truck.name;
    },
    methods: {
        ...mapActions(["assignTruck", "deleteTruck", "updateTruck"]),
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
                await this.deleteTruck(payload);
            } catch (err) {
                console.log(err);
            }
        },
        async updateTruckInfo() {
            try {
                const payload = {
                    driverId: this.userId,
                    truckId: this.truck._id,
                    name: this.name.trim()
                };
                const res = await this.updateTruck(payload);
                if (res.data) {
                    this.updatedMessage = "Updated";
                } else {
                    this.updatedMessage = res.error.response.data.error;
                }
            } catch (err) {
                this.updatedMessage = err.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_truck-item.scss";
</style>
