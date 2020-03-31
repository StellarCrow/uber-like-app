<template>
    <div class="load">
        <div class="load__body"></div>
        <div class="load__details">
            <div class="load__info">
                <div class="load__item feature">
                    <div class="feature__name">Name</div>
                    <div class="feature__value truck__name">
                        {{ name }}
                    </div>
                </div>
                <div class="load__item feature">
                    <div class="feature__name">Status</div>
                    <div class="feature__value truck__name">
                        {{ status }}
                    </div>
                </div>
                <div class="load__item feature">
                    <div class="feature__name">State</div>
                    <div class="feature__value truck__name">
                        {{ state }}
                    </div>
                </div>
            </div>
            <div class="load__buttons">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadItem",
    props: ["load"],
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
@import '../styles/components/_load-item.scss';
</style>
