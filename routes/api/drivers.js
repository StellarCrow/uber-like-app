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

router.get('/drivers/:id/trucks', async (req, res) => {
  const driverId = req.params.id;

  // driver can get only his trucks
  if (driverId !== req.user.id) {
    return res.status(403).json({error: 'Forbidden'});
  }

  try {
    const trucks = await DriverService.getTrucks(driverId);
    return res.status(200).json({trucks: trucks});
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

module.exports = router;
