const express = require("express");
const stripeHandler = require("../handler/stripeHandler");
const router = express.Router();
// Auth Routes
router.post("/checkout", stripeHandler.checkout)
router.post("/webhook",express.json({ type: "application/json" }), stripeHandler.webhook)

module.exports = {
    stripe: router,
}