<template>
    <section class="section settings">
        <h2 class="section__title">Settings</h2>
        <FormSettings class="settings__form" />
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
