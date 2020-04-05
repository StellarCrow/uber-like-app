import Api from "./Api";

export default {
    getWeather() {
        return Api().get(`/api/weather/`);
    }
};
