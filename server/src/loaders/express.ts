import express, { type Express } from "express";
import cors from "cors";

import routes from "../api/route";
import config from "../config";

export default (app: Express) => {
  const corsOptions = {
    origin: config.allowClientUrl,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/api", routes());
};
