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
                    {{ log.logDate }}
                </div>
                <div class="log__hours">
                    {{ log.logHours }}
                </div>
            </div>
            <div class="log__message">{{ log.message }}</div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "LogsList",
    props: ["logs"],
    mounted() {
        this.logs.forEach(log => {
            log.logDate = log.time.split("T")[0];
            log.logHours = log.time.split("T")[1].split(".")[0];
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_logs-list.scss";
</style>
