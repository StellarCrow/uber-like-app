<template>
    <section class="page settings">
        <h2 class="page__title">Settings</h2>
        <FormSettings class="page__form" />
    </section>
</template>

<script>
import FormSettings from "../components/FormSettings";

export default {
    name: "Settings",
    components: { FormSettings }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_settings.scss";
</style>
