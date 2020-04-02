<template>
    <section class="page login">
        <h2 class="page__title">Login</h2>
        <FormLogin class="page__form" />
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

<style lang="scss" scoped>
@import "../styles/pages/_login.scss";
</style>
