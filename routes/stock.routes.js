const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/stock.controller");
const { authToken } = require("../middlewares/auth");

router.post("/out/:id", authToken, stocksController.addStockOut)
router.post("/in/:id", authToken, stocksController.addStockIn)

module.exports = router