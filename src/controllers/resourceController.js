const {
  getSingleResource,
  getMultipleResource,
  createMultipleResource,
  updateSingleResource,
} = require("../service/resourceService.js");
const { validateFilter } = require("../utils/helper.js");
const constants = require("../constants/constant.json");

async function handleGetMultipleResource(req, res) {
  //validations Check firsts
  let { filter } = req.query;
  filter = validateFilter(filter);
  if (!filter) {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }

  const limit = req.params?.limit || 10;
  const skip = req.params?.skip || 0;

  if (limit <= 0 || skip < 0 || limit >= 100 || skip >= 100) {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }
  try {
    const resources = await getMultipleResource({
      filter,
      limit,
      skip,
    });
    if (resources.length > 0) {
      return res.status(constants.status.code.SUCCESS).json({
        status: "success",
        message: "Seems Everything is OK",
        data: resources,
      });
    } else {
      return res.status(constants.status.code.NOT_FOUND).json({
        status: "success",
        message: "Resources Not found",
        data: {},
      });
    }
  } catch (error) {
    console.log(`Error while data from database ${error.message}`);
    return res.status(constants.status.code.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Database Error",
      data: {},
    });
  }
}

async function handleInsertMultipleResource(req, res) {
  const { resources = [] } = req.body;
  if (resources && resources?.length === 0) {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }

  try {
    const insertedResources = await createMultipleResource(resources);
    if (insertedResources.length === 0) {
      return res.status(constants.status.code.NOT_FOUND).json({
        status: "failed",
        message: "No resources Inserted.",
        data: {},
      });
    } else {
      return res.status(constants.status.code.SUCCESS).json({
        status: "success",
        message: "Resources successfully Inserted.",
        data: insertedResources,
      });
    }
  } catch (error) {
    return res.status(constants.status.code.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Error while resource insertion.",
      data: {},
    });
  }
}

async function handleGetSingleResource(req, res) {
  const { id } = req.params;
  if (!id || id === "") {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }

  try {
    const resource = await getSingleResource({ id });
    if (resource) {
      return res.status(constants.status.code.SUCCESS).json({
        status: "success",
        message: "Everything Seems OK",
        data: resource,
      });
    } else {
      return res.status(constants.status.code.NOT_FOUND).json({
        status: "failed",
        message: "Resource Not Found",
        data: {},
      });
    }
  } catch (error) {
    console.log(`Error while data from database ${error.message}`);
    return res.status(constants.status.code.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Database Error",
      data: {},
    });
  }
}

async function handleUpdateSingleResource(req, res) {
  const { id } = req.params;
  if (!id || id === "") {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }

  const updateObj = req.body;
  if (!updateObj) {
    return res.status(constants.status.code.BAD_REQUEST).json({
      status: "failed",
      message: "Bad Request",
      data: {},
    });
  }

  try {
    const resource = await updateSingleResource(id, updateObj);
    if (!resource) {
      return res.status(constants.status.code.NOT_FOUND).json({
        status: "failed",
        message: "Resource Not Found for updation",
        data: {},
      });
    }
    return res.status(constants.status.code.SUCCESS).json({
      status: "success",
      message: "Successfully updated details",
      data: resource,
    });
  } catch (error) {
    console.log(`Error while updating database details. ${error.message}`);
    return res.status(constants.status.code.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Error while updating database",
      data: {},
    });
  }
}

module.exports = {
  handleGetMultipleResource,
  handleInsertMultipleResource,
  handleGetSingleResource,
  handleUpdateSingleResource,
};
