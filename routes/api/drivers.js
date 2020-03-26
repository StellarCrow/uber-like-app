const express = require('express');
const router = new express.Router();
const DriverService = require('../../services/DriverService');

router.get('/drivers/:id', async (req, res) => {
  const driverId = req.params.id;
  try {
    const driver = await DriverService.getProfile(driverId);
    return res.status(200).json({driver: driver});
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
    return res.status(404).json({error: err.message});
  }
});

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

router.patch('/drivers/:id/trucks/:tid', async (req, res) => {
  const driverId = req.params.id;
  const truckId = req.params.tid;
  try {
    const assigned = await DriverService.assignTruck(driverId, truckId);
    return res.status(200).json({assignedTruck: assigned});
  } catch (err) {
    if (err.name === 'ServerError') {
      return res.status(500).json({error: err.message});
    }
  }
});

module.exports = router;
