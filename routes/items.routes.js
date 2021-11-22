const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");
const { authToken } = require("../middlewares/auth");

router.post("/", authToken, itemsController.addItem);
router.get("/", authToken, itemsController.showListItems);
router.get("/:id", authToken, itemsController.showItemById);
router.get("/:category", authToken, itemsController.showItemsByCategory);
router.get("/", authToken, itemsController.searchingItems);
router.put("/:id", authToken, itemsController.updateItemById);
router.delete("/:id", authToken, itemsController.deleteItemById);

module.exports = router;
