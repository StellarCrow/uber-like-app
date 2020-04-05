<template>
    <div class="weather feature" v-if="!error">
        <div class="weather__title feature__name">Weather</div>
        <div class="weather__body feature__value">
            <div class="weather__icon">
                <img class="weather__img" :src="icon" :alt="description" />
            </div>
            <span class="weather__city">{{ city }}</span>
            <span class="weather__temp">{{ temperature }} {{ degree }}</span>
        </div>
    </div>
    <div class="weather" v-else>
        {{ error }}
    </div>
</template>

<script>
import WeatherService from "../services/WeatherService";

export default {
    name: "WeatherWidget",
    data() {
        return {
            city: "",
            icon: "",
            temperature: "",
            description: "",
            error: "",
            degree: "°C"
        };
    },
    async mounted() {
        try {
            const res = await WeatherService.getWeather();
            const weather = res.data.weather;

            this.city = weather.city;
            this.temperature = weather.temp;
            this.icon = weather.icon;
            this.description = weather.description;
        } catch (err) {
            this.error = err.message;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_weather-widget.scss";
</style>
