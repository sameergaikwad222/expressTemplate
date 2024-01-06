function validateFilter(filter = "") {
  if (!filter || filter === "") {
    return {};
  }
  try {
    let filterObj = JSON.parse(filter);
    return filterObj;
  } catch (error) {
    console.log("Error while parsing Filter", error.message);
    return undefined;
  }
}

module.exports = { validateFilter };
