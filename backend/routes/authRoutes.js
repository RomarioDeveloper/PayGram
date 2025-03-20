const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();
router.post("/login", authMiddleware);

module.exports = router;
