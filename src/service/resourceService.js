const Resource = require("../models/resource");

async function getSingleResource({ id = "" }) {
  try {
    const resource = await Resource.findById(id).lean();
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getMultipleResource({ filter = {}, limit = 10, skip = 0 }) {
  try {
    const resources = await Resource.find(filter)
      .limit(limit)
      .skip(skip)
      .lean();
    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createMultipleResource(resources = []) {
  if (resources.length <= 0) {
    return [];
  }
  try {
    const response = await Resource.insertMany(resources);
    if (response.length > 0) {
      return response;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateSingleResource(id = "", updateResourceObj = {}) {
  if (!updateResourceObj) {
    return undefined;
  }
  try {
    const updatedObj = await Resource.findByIdAndUpdate(id, {
      $set: updateResourceObj,
    });
    return updatedObj;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getSingleResource,
  getMultipleResource,
  createMultipleResource,
  updateSingleResource,
};
