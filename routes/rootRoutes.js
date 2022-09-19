const express = require('express');

const router = express.Router();

const rootController = require('../controllers/rootController');

router.get('/', rootController.getAllRoots);
router.get('/busroots', rootController.getBusRoots);
router.get('/:id', rootController.getRootById);
router.post('/', rootController.createRoot);
router.put('/:id', rootController.updateRoot);
router.delete('/:id', rootController.deleteRoot);

module.exports = router;
