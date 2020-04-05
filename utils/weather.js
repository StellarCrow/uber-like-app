const request = require('request-promise');
const ServerError = require('../errors/ServerError');

const apiKey = require('config').weather.apiKey;
const city = require('config').weather.city;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

class Weather {
  async getWeather() {
    try {
      const options = {
        uri: weatherUrl,
      };
      const response = await request(options);
      const weather = JSON.parse(response);
      const icon = weather.weather[0].icon;
      const description = weather.weather[0].description;
      const iconurl = `http://openweathermap.org/img/w/${icon}.png`;
      const data = {
        main: weather.weather.main,
        temp: weather.main.temp,
        city: weather.name,
        icon: iconurl,
        description: description,
      };

      return data;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}

module.exports = new Weather();
