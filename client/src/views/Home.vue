<template>
    <section class="home">
        <section class="home__header">
            <div class="home__name">
                <h1 class="home__title">Krevetochka Delivery</h1>
            </div>
        </section>
        <section class="section role">
            <header class="section__header">
                <h2 class="section__title">Choose Your Role</h2>
                <p class="section__subtitle">
                    This your last chance. After this there is no turning back.
                </p>
            </header>

            <div class="role__choice">
                <RoleCard
                    class="role__card"
                    :role="this.driver.role"
                    :description="this.driver.description"
                    :title="this.driver.title"
                />
                <RoleCard
                    class="role__card"
                    :role="this.shipper.role"
                    :description="this.shipper.description"
                    :title="this.shipper.title"
                />
            </div>
            <div class="role__login">
                Already have an accont?<router-link
                    to="/login"
                    class="role__link"
                >
                    Sign in</router-link
                >
            </div>
        </section>
    </section>
</template>

<script>
import RoleCard from "../components/RoleCard";
export default {
    name: "Home",
    components: { RoleCard },
    data() {
        return {
            driver: {
                role: "driver",
                title: "Initially Designed To Deliver Loads",
                description:
                    "You will create and assign as many trucks as you want"
            },
            shipper: {
                role: "shipper",
                title: "Initially Designed To Create Loads",
                description:
                    "You will create and post as many loads as you want"
            }
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/pages/_home.scss";
</style>
