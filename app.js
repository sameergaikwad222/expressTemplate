const config = require("./config/config.json");
const { connectMongoDB } = require("./src/database/database");
const express = require("express");
const { resourceRouter, healthRouter } = require("./src/routes");
const app = express();

async function initApp() {
  await connectMongoDB();
  const PORT = config?.port || 3000;
  try {
    app.use(express.json());
    app.use("/resource", resourceRouter);
    app.use("/health", healthRouter);
    app.listen(PORT, () => {
      console.log(`App Started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error while starting an App, ${error.message}`);
  }
}

initApp();
