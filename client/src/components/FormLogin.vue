<template>
    <form class="form" @submit.prevent="sendFormData">
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
                Login
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "FormLogin",
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        ...mapActions(["login"]),
        async sendFormData() {
            const payload = {
                email: this.email,
                password: this.password
            };
            try {
                const res = await this.login(payload);
                if (res.user) {
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

<style lang="scss" scoped></style>
