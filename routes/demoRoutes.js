const express = require('express');

const router = express.Router();

const demoController = require('../controllers/demoController');

router.get('/', demoController.getAllDemos);
// router.get('/:id', subjectController.getSubjectById);
router.post('/', demoController.createDemo);
// router.put('/:id', subjectController.updateSubject);
// router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
