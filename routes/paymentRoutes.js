const express = require('express');
const router = express.Router();
const {
  processStripePayment,
  createPayPalPayment,
  executePayPalPayment,
  getPayPalClientId,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Stripe routes
router.route('/stripe').post(protect, processStripePayment);

// PayPal routes
router.route('/paypal').post(protect, createPayPalPayment);
router.route('/paypal/execute').post(protect, executePayPalPayment);
router.route('/paypal/client-id').get(getPayPalClientId);

module.exports = router;