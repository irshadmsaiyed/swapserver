const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);
router.get('/users', employeeController.getUserEmployees);
router.get('/teachers', employeeController.getTeachers);
router.get('/drivers', employeeController.getDrivers);
router.get('/all', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.upload, employeeController.createEmployee);
router.put(
  '/:id',
  employeeController.upload,
  employeeController.updateEmployee
);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
