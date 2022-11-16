const express = require("express");
const authHandler = require("../handler/auth.handler");
const { auth } = require("../handler/authHelper");
const router = express.Router();
// Auth Routes
router.get("/", authHandler.defaultRoot)
router.post("/register", authHandler.register)
router.post("/login", authHandler.login)
router.post("/verify-jwt", authHandler.verifyToken)

module.exports = {
    routes: router,
}