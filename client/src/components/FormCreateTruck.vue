<template>
    <form class="form" @submit.prevent="addTruck()">
        <div class="form__field">
            <label for="name" class="form__label">Truck Name</label>
            <input
                type="text"
                id="name"
                class="form__input"
                placeholder="Nissan"
                v-model="name"
                required
            />
        </div>
        <div class="form__field">
            <label for="truck_type" class="form__label">Truck type</label>
            <select
                name="truck-type"
                id="truck_type"
                class="form__select"
                v-model="truckType"
                required
            >
                <option value="SPRINTER">Sprinter</option>
                <option value="SS">Small Straight</option>
                <option value="LS">Large Straight</option>
            </select>
        </div>
        <div class="form__error" v-if="error">
            {{ error }}
        </div>
        <div class="form__field">
            <button class="button form__button" type="submit">
                Add new truck
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
            truckType: "SPRINTER",
            error: ""
        };
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        ...mapActions(["addNewTruck"]),
        async addTruck() {
            const payload = {
                name: this.name,
                type: this.truckType,
                driverId: this.userId
            };
            try {
                const res = await this.addNewTruck(payload);
                if (res.truck) {
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
