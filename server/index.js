import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import appRoutes from "./router/server_routes.js";

const PORT = 5000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/", appRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server runnng on: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
