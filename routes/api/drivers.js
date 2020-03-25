const express = require('express');
const router = new express.Router();
const DriverService = require('../../services/DriverService');

router.post('/drivers/:id/trucks', async (req, res) => {
  const truckInfo = {
    createdBy: req.params.id,
    status: 'IS',
    type: req.body.type,
  };
  try {
    const truck = await DriverService.createTruck(truckInfo);
    return res.status(201).json({truck: truck});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
