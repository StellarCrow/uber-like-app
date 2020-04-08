const express = require('express');
const router = new express.Router();
const Weather = require('../../utils/weather');

/**
 * @api {get} /api/weather Get actual weather info
 * @apiName GetWeather
 * @apiGroup Weather
 *
 *
 * @apiSuccess {Object} weather weather info.
 * @apiSuccess {Number} weather.temp temperature.
 * @apiSuccess {String} weather.main weather name.
 * @apiSuccess {String} weather.description weather description.
 * @apiSuccess {String} weather.city city name.
 * @apiSuccess {String} weather.icon image url for displaying current weather.
 *
 * @apiError ServerError Server error
 */

router.get('/weather', async (req, res) => {
  try {
    const weather = await Weather.getWeather();
    return res.status(200).json({weather});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
