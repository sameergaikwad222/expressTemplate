const express = require("express");
const resourceRouter = express.Router();
const {
  handleGetMultipleResource,
  handleInsertMultipleResource,
  handleGetSingleResource,
  handleUpdateSingleResource,
} = require("../controllers/resourceController");

resourceRouter.get("/multiple", handleGetMultipleResource);
resourceRouter.get("/:id", handleGetSingleResource);
resourceRouter.post("/multiple", handleInsertMultipleResource);
resourceRouter.patch("/:id", handleUpdateSingleResource);

module.exports = { resourceRouter };
