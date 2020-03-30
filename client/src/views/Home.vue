<template>
    <div class="home">
        <h1>Home</h1>
        <FormRegistration />
        <FormLogin />
    </div>
</template>

<script>
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";

export default {
    name: "Home",
    components: { FormRegistration, FormLogin }
};
</script>
