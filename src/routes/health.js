const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Everything Seems Healthy 🚀🚀",
    data: {
      health: "Good 🚀🚀",
      date: new Date(),
    },
  });
});

module.exports = { healthRouter };
