const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");
const { authToken } = require("../middlewares/auth");

router.post("/", authToken, itemsController.addItem);
router.get("/", authToken, itemsController.showListItems);

module.exports = router;
