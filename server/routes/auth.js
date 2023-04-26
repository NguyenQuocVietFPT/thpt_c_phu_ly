const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");

router.post("/register", authController.resigter);
router.post("/login", authController.login);

module.exports = router;
