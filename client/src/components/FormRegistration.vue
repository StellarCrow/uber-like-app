<template>
    <form class="form" @submit.prevent="sendFormData" autocomplete="off">
        <div class="form__field">
            <label for="register_name" class="form__label">Name</label>
            <input
                type="text"
                name="name"
                id="register_name"
                class="form__input"
                placeholder="Enter your name"
                minlength="1"
                maxlength="25"
                v-model="name"
                pattern="(([A-Za-z]+\s?)|([\u0400-\u04FF]+'?\s?))+"
                required
            />
        </div>
        <div class="form__field">
            <label for="register_email" class="form__label">Email</label>
            <input
                type="email"
                id="register_email"
                class="form__input"
                placeholder="example@email.com"
                v-model="email"
                required
            />
        </div>
        <div class="form__field">
            <label for="register_password" class="form__label">Password</label>
            <input
                type="password"
                placeholder="*****"
                id="register_password"
                class="form__input"
                v-model="password"
                required
            />
        </div>
        <div class="form__error" v-if="error">
            {{ error }}
        </div>
        <div class="form__field">
            <button class="button form__button" type="submit">
                Registrate
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "FormRegistration",
    props: ["role"],
    data() {
        return {
            name: "",
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        ...mapActions(["register", "login"]),
        async sendFormData() {
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role
            };

            try {
                const res = await this.register(payload);
                if (res.user) {
                    this.$router.push("/login");
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

<style lang="scss" scoped></style>
