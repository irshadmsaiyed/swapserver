const express = require('express');

const router = express.Router();

const workingDaysController = require('../controllers/workingDaysController');

router.get('/', workingDaysController.getAllWorkingDays);
router.get('/:id', workingDaysController.getWorkingDaysById);
router.post('/', workingDaysController.createWorkingDays);
router.put('/:id', workingDaysController.updateWorkingDays);
router.delete('/:id', workingDaysController.deleteWorkingDays);

module.exports = router;
