<template>
    <ul class="log-list">
        <li
            class="log-list__item log"
            v-for="(log, index) in this.logs"
            :key="log._id"
        >
            <div class="log__number">{{ ++index }}</div>
            <div class="log__time">
                <div class="log__date">
                    {{ log.time.split("T")[0] }}
                </div>
                <div class="log__hours">
                    {{ log.time.split("T")[1].split(".")[0] }}
                </div>
            </div>
            <div class="log__message">{{ log.message }}</div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "LogsList",
    props: ["logs"]
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_logs-list.scss";
</style>
