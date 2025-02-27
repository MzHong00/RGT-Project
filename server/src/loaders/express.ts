import express, { type Express } from "express";
import cors from "cors";

import routes from "../api/route";
import config from "../config";

export default (app: Express) => {
  console.log(config.allowClientUrl);
  
  const corsOptions = {
    origin: "https://rgt-three.vercel.app",
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/api", routes());
};
