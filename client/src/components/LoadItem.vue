<template>
    <div class="load">
        <div class="load__message">{{ postMessage }}</div>
        <div class="load__body">
            <div class="load__info">
                <div class="load__item feature">
                    <div class="feature__name">Name</div>
                    <div class="feature__value load__name">
                        {{ name }}
                    </div>
                </div>
                <div class="load__item feature">
                    <div class="feature__name">Status</div>
                    <div class="feature__value load__name" :class="addClass">
                        {{ status }}
                    </div>
                </div>
                <div class="load__item feature" v-if="state">
                    <div class="feature__name">State</div>
                    <div class="feature__value load__name" v-if="isShipper">
                        {{ state }}
                    </div>
                    <div class="feature__value load__name" v-else>
                        <SelectLoadState :load="load" />
                    </div>
                </div>
            </div>
            <div class="load__buttons">
                <button
                    @click.prevent="postNewLoad()"
                    class="button button--assign"
                    v-if="isStatusNew"
                >
                    Post
                </button>
                <button
                    class="button button--primary"
                    @click.prevent="showLogs = !showLogs"
                    v-if="!showDetails && isShipper"
                >
                    Show logs
                </button>
                <button
                    class="button"
                    @click.prevent="showDetails = !showDetails"
                    v-if="!showLogs"
                >
                    Show details
                </button>
                <button
                    @click="deleteLoadFromList()"
                    class="button button--delete"
                    v-if="isStatusNew"
                >
                    Delete
                </button>
            </div>
        </div>
        <div class="load__details" v-if="showDetails">
            <div class="load__details-list">
                <div class="detail">
                    <div class="detail__name">Name</div>
                    <div class="detail__value">
                        <input
                            class="detail__input"
                            type="text"
                            v-model="name"
                            placeholder="Load name"
                            :disabled="!isStatusNew"
                            maxlength="30"
                            required
                        />
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Description</div>
                    <div class="detail__value">
                        <textarea
                            class="detail__textarea"
                            cols="25"
                            rows="3"
                            v-model="description"
                            :disabled="!isStatusNew"
                            maxlength="300"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Payload</div>
                    <div class="detail__value">
                        <input
                            class="detail__input"
                            type="number"
                            v-model="payload"
                            :disabled="!isStatusNew"
                            min="1"
                            max="1000"
                            required
                        />
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Dimensions</div>
                    <div class="detail__value detail__value--horizontal">
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Width
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="number"
                                    min="1"
                                    max="1000"
                                    v-model="dimensions.width"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Length
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="number"
                                    min="1"
                                    max="1000"
                                    v-model="dimensions.length"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Height
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="number"
                                    min="1"
                                    max="1000"
                                    v-model="dimensions.height"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Delivery Address</div>
                    <div class="detail__value detail__value--horizontal">
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                City
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="text"
                                    maxlength="100"
                                    v-model="deliveryAddress.city"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Street
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="text"
                                    maxlength="100"
                                    v-model="deliveryAddress.street"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Zip
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="number"
                                    min="1"
                                    max="99999"
                                    v-model="deliveryAddress.zip"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail__name">Pick Up Address</div>
                    <div class="detail__value detail__value--horizontal">
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                City
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="text"
                                    maxlength="100"
                                    v-model="pickUpAddress.city"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Street
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="text"
                                    maxlength="100"
                                    v-model="pickUpAddress.street"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                        <div class="feature detail__feature">
                            <div class="feature__name">
                                Zip
                            </div>
                            <div class="feature__value">
                                <input
                                    class="detail__input"
                                    type="number"
                                    min="1"
                                    max="99999"
                                    v-model="pickUpAddress.zip"
                                    required
                                    :disabled="!isStatusNew"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="load__update">
                <button
                    class="button"
                    v-if="isStatusNew"
                    @click="updateLoadInfo()"
                >
                    Update info
                </button>
                <div class="load__message">{{ updatedMessage }}</div>
            </div>
        </div>
        <div class="load__logs" v-if="showLogs">
            <LogsList :logs="load.logs" />
        </div>
    </div>
</template>

<script>
import loadConstants from "../utils/loadConstants";
import { mapActions, mapGetters, mapState } from "vuex";
import SelectLoadState from "./SelectLoadState";
import LogsList from "./LogsList";

export default {
    name: "LoadItem",
    props: ["load"],
    components: { SelectLoadState, LogsList },
    data() {
        return {
            name: "",
            payload: "",
            description: "",
            dimensions: {
                width: "",
                height: "",
                length: ""
            },
            deliveryAddress: {
                city: "",
                street: "",
                zip: ""
            },
            pickUpAddress: {
                city: "",
                street: "",
                zip: ""
            },
            showDetails: false,
            showLogs: false,
            updatedMessage: "",
            postMessage: ""
        };
    },
    computed: {
        ...mapState({
            role: state => state.Auth.role
        }),
        ...mapGetters(["userId"]),
        status() {
            return this.load.status;
        },
        state() {
            return this.load.state;
        },
        isStatusNew() {
            return this.status === "NEW";
        },
        isShipper() {
            return this.role === "shipper";
        },
        addClass() {
            const loadStatus = loadConstants.loadStatus;
            switch (this.load.status) {
                case loadStatus.NEW:
                    return "load__status--new";
                case loadStatus.POSTED:
                    return "load__status--posted";
                case loadStatus.ASSIGNED:
                    return "load__status--assigned";
                case loadStatus.SHIPPED:
                    return "load__status--shipped";
                default:
                    return "";
            }
        }
    },
    mounted() {
        this.name = this.load.name;
        this.description = this.load.description;
        this.payload = this.load.payload;
        this.dimensions = this.load.dimensions;
        this.deliveryAddress = this.load.deliveryAddress;
        this.pickUpAddress = this.load.pickUpAddress;
    },
    methods: {
        ...mapActions(["updateLoad", "deleteLoad", "postLoad"]),
        async updateLoadInfo() {
            const payload = {
                name: this.name.trim(),
                description: this.description.trim(),
                payload: this.payload,
                dimensions: this.dimensions,
                deliveryAddress: this.deliveryAddress,
                pickUpAddress: this.pickUpAddress
            };
            const shipperId = this.userId;
            const loadId = this.load._id;
            try {
                const res = await this.updateLoad({
                    shipperId,
                    loadId,
                    payload
                });
                if (res.load) {
                    this.updatedMessage = "Updated";
                } else {
                    this.updatedMessage = res.error.response.data.error;
                }
            } catch (err) {
                this.updatedMessage = err.message;
            }
        },
        async deleteLoadFromList() {
            try {
                const payload = {
                    shipperId: this.userId,
                    loadId: this.load._id
                };
                await this.deleteLoad(payload);
            } catch (err) {
                console.log(err);
            }
        },
        async postNewLoad() {
            try {
                const payload = {
                    shipperId: this.userId,
                    loadId: this.load._id
                };
                const res = await this.postLoad(payload);
                if (!res.load.response) {
                    this.postMessage = res.load.message;
                } else {
                    const driverNotFound = res.load.response.data.error;
                    this.postMessage = driverNotFound;
                }
            } catch (err) {
                this.postMessage = err.message;
            } finally {
                setTimeout(() => {
                    this.postMessage = "";
                }, 3000);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_load-item.scss";
</style>
