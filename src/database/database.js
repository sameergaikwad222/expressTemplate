const dbConfig = require("../../config/dbConfig.json");
const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect(dbConfig.database.url, {
      dbName: dbConfig.database.dbName,
    });
    console.log("Database connected Successfully");
  } catch (error) {
    console.log(`Error while connecting database ${error.message}`);
  }
}

module.exports = { connectMongoDB };
