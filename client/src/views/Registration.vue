<template>
    <section class="section registration">
        <h2 class="section__title">Registrate As {{ this.role }}</h2>
        <FormRegistration :role="this.role" />
    </section>
</template>

<script>
import FormRegistration from "../components/FormRegistration";
export default {
    name: "Registration",
    components: { FormRegistration },
    data() {
        return {
            role: ""
        };
    },
    mounted() {
        this.role = this.$route.params.role;
    }
};
</script>

<style></style>
