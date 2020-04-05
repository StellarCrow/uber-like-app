const express = require('express');
const router = new express.Router();
const Weather = require('../../utils/weather');

router.get('/weather/', async (req, res) => {
  try {
    const weather = await Weather.getWeather();
    return res.status(200).json({weather});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
