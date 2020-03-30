<template>
    <div class="card">
        <div class="card__container">
            <div class="card__role">{{ this.role }}</div>
            <div class="card__title">{{ this.title }}</div>
            <div class="card__description">{{ this.description }}</div>
            <div class="button button--role card__button" @click="registrate()">
                Start Here
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RoleCard",
    props: ["role", "title", "description"],
    data() {
        return {};
    },
    methods: {
        registrate() {
            this.$router.push({
                path: `/registration/${this.role}`
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_card.scss";
</style>
