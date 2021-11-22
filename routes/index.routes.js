const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const itemsRouter = require("./items.routes");

router.use("/auth", authRouter);
router.use("/items", itemsRouter);

module.exports = router;
