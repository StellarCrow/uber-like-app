<template>
    <form class="form" @submit.prevent="addLoad()">
        <div class="form__header">Main info</div>
        <div class="form__field">
            <label for="name" class="form__label">Load Name</label>
            <input
                type="text"
                id="name"
                class="form__input"
                placeholder="Name"
                v-model="name"
                maxlength="30"
                required
            />
        </div>
        <div class="form__field">
            <label for="description" class="form__label"
                >Load description</label
            >
            <textarea
                class="form__textarea"
                id="description"
                placeholder="Description..."
                cols="30"
                rows="10"
                v-model="description"
                required
            ></textarea>
        </div>
        <div class="form__header">Dimensions</div>
        <div class="form__group">
            <div class="form__field">
                <label class="form__label" for="width">Width</label>
                <input
                    class="form__input form__input--number"
                    type="number"
                    placeholder="100"
                    min="1"
                    max="1000"
                    id="width"
                    v-model="dimensions.width"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="length">Length</label>
                <input
                    class="form__input form__input--number"
                    type="number"
                    placeholder="150"
                    min="1"
                    max="1000"
                    id="length"
                    v-model="dimensions.length"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="height">Height</label>
                <input
                    class="form__input form__input--number"
                    type="number"
                    placeholder="50"
                    min="1"
                    max="1000"
                    id="height"
                    v-model="dimensions.height"
                    required
                />
            </div>
        </div>
        <div class="form__field">
            <label class="form__label" for="payload">Payload</label>
            <input
                class="form__input form__input--number"
                type="number"
                placeholder="10"
                min="1"
                max="1000"
                id="payload"
                v-model="payload"
                required
            />
        </div>
        <div class="form__header">Delivery Address</div>
        <div class="form__group">
            <div class="form__field">
                <label class="form__label" for="delivery_city">City</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="City"
                    maxlength="100"
                    id="delivery_city"
                    v-model="deliveryAddress.city"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="delivery_street">Street</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="Street 21"
                    maxlength="100"
                    id="delivery_street"
                    v-model="deliveryAddress.street"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="delivery_zip">Zip code</label>
                <input
                    class="form__input form__input--number"
                    type="number"
                    placeholder="12145"
                    min="1"
                    max="99999"
                    pattern="/[0-9]{5}/"
                    id="delivery_zip"
                    v-model="deliveryAddress.zip"
                    required
                />
            </div>
        </div>
        <div class="form__header">Pick Up Address</div>
        <div class="form__group">
            <div class="form__field">
                <label class="form__label" for="pickup_city">City</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="City"
                    maxlength="100"
                    id="pickup_city"
                    v-model="pickUpAddress.city"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="pickup_street">Street</label>
                <input
                    class="form__input"
                    type="text"
                    placeholder="Street 89"
                    maxlength="100"
                    id="pickup_street"
                    v-model="pickUpAddress.street"
                    required
                />
            </div>
            <div class="form__field">
                <label class="form__label" for="pickup_zip">Zip code</label>
                <input
                    class="form__input form__input--number"
                    type="number"
                    placeholder="76493"
                    min="1"
                    max="99999"
                    pattern="/[0-9]{5}/"
                    id="pickup_zip"
                    v-model="pickUpAddress.zip"
                    required
                />
            </div>
        </div>
        <div class="form__error" v-if="error">
            {{ error }}
        </div>
        <div class="form__field">
            <button class="button form__button" type="submit">
                Add new load
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "FormCreateTruck",
    data() {
        return {
            name: "",
            description: "",
            dimensions: {
                width: "",
                height: "",
                length: ""
            },
            payload: "",
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
            error: ""
        };
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        ...mapActions(["addNewLoad"]),
        async addLoad() {
            const payload = {
                name: this.name.trim(),
                description: this.description.trim(),
                dimensions: this.dimensions,
                payload: this.payload,
                deliveryAddress: this.deliveryAddress,
                pickUpAddress: this.pickUpAddress
            };
            try {
                const res = await this.addNewLoad({
                    payload,
                    shipperId: this.userId
                });
                if (res.load) {
                    this.$router.push("/profile");
                } else {
                    this.error = res.error.response.data.error;
                }
            } catch (err) {
                this.error = err.message;
            }
        }
    }
};
</script>

<style></style>
