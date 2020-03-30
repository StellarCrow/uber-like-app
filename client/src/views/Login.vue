<template>
    <section class="section login">
        <h2 class="section__title">Login</h2>
        <FormLogin />
    </section>
</template>

<script>
import FormLogin from "../components/FormLogin";
export default {
    name: "Login",
    components: { FormLogin },
    data() {
        return {};
    }
};
</script>

<style></style>
