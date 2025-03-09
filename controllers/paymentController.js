const asyncHandler = require('express-async-handler');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('paypal-rest-sdk');

// Configure PayPal
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// @desc    Process Stripe payment
// @route   POST /api/payments/stripe
// @access  Private
const processStripePayment = asyncHandler(async (req, res) => {
  const { paymentMethodId, amount, currency = 'usd' } = req.body;

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      description: 'Payment for order',
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Create PayPal payment
// @route   POST /api/payments/paypal
// @access  Private
const createPayPalPayment = asyncHandler(async (req, res) => {
  const { items, amount, currency = 'USD', returnUrl, cancelUrl } = req.body;

  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
    transactions: [
      {
        item_list: {
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            currency,
            quantity: item.quantity,
          })),
        },
        amount: {
          currency,
          total: amount,
        },
        description: 'Payment for order',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      const approvalUrl = payment.links.find(
        (link) => link.rel === 'approval_url'
      );
      res.json({
        success: true,
        paymentId: payment.id,
        approvalUrl: approvalUrl.href,
      });
    }
  });
});

// @desc    Execute PayPal payment after user approval
// @route   POST /api/payments/paypal/execute
// @access  Private
const executePayPalPayment = asyncHandler(async (req, res) => {
  const { paymentId, payerId } = req.body;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.json({
          success: true,
          payment,
        });
      }
    }
  );
});

// @desc    Get PayPal client ID
// @route   GET /api/payments/paypal/client-id
// @access  Public
const getPayPalClientId = asyncHandler(async (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = {
  processStripePayment,
  createPayPalPayment,
  executePayPalPayment,
  getPayPalClientId,
};