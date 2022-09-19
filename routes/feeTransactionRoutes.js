const express = require('express');

const router = express.Router();

const feeTransactionController = require('../controllers/feeTransactionController');

router.get('/', feeTransactionController.getAllFeeTransactions);
router.get('/:id', feeTransactionController.getFeeTransactionById);
router.post('/', feeTransactionController.createFeeTransaction);
router.put('/:id', feeTransactionController.updateFeeTransaction);
router.delete('/:id', feeTransactionController.deleteFeeTransaction);

module.exports = router;
