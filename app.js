const config = require("./config/config.json");
const { connectMongoDB } = require("./src/database/database");
const express = require("express");
const { resourceRouter, healthRouter } = require("./src/routes");
const app = express();
const process = require("node:process");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/swagger.json");
const { logger } = require("./src/middlewares/customMiddlewares");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function initApp() {
  const PORT = config?.port || 3000;
  try {
    await connectMongoDB();
    // Middlewares
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(logger);

    // Routers
    app.use("/resource", resourceRouter);
    app.use("/health", healthRouter);

    // Start The Server
    app.listen(PORT, () => {
      console.log(`App Started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error while starting an App, ${error.message}`);
    process.exit(1);
  }
}

initApp();
