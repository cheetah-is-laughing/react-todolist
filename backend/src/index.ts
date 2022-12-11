import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import todoRoutes from "./routes/TodoRoutes";

const app = express();

// connect to mongoose
mongoose.set("strictQuery", false);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB 🚀");
    startServer();
  })
  .catch((error) => {
    Logging.error("❌ Unable to connect: ");
    Logging.error(error);
  });

// only start the server if mongo connects
const startServer = () => {
  app.use((req, res, next) => {
    // log the req
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      // log the res
      Logging.info(
        `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // routes
  app.use("/todos", todoRoutes);

  // healthCheck
  app.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong 🏓" })
  );

  // error
  app.use((req, res, next) => {
    const error = new Error("Not Found!!");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  app.listen(config.server.port, () => {
    Logging.info(`Server is listening on port ${config.server.port} ✔️`);
  });
};
