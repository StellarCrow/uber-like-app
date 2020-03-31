<template>
    <section class="section create">
        <div class="section__title">Add new {{ this.title }}</div>
        <FormCreateTruck v-if="this.driver" class="create__form" />
    </section>
</template>

<script>
import { mapState } from "vuex";
import FormCreateTruck from "../components/FormCreateTruck";

export default {
    name: "Create",
    components: { FormCreateTruck },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            role: state => state.Auth.role
        }),
        title() {
            if (this.role === "driver") {
                return "truck";
            } else return "load";
        },
        driver() {
            return this.role === "driver";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_create.scss";
</style>
