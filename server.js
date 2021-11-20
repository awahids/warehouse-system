const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "success running a server",
  });
});

module.exports = app;
