require("dotenv").config();

import express, { json } from "express";
const app = express();

import { connect } from "./db/client";
connect();

import cors from "cors";
app.use(cors());

app.use(json());

import morgan from "morgan";
app.use(morgan("dev"));

app.use((req, res, next) => {
  next();
});

// Setup your Middleware and API Router here
import apiRouter from "./api";
app.use("/api", apiRouter);

//error handler
app.use((error, req, res, next) => {
  res.send(error);
});

app.get("/api/unknown", (req, res) => {
  res.status(404).send({ message: "The endpoint could not be found." });
});

export default app;
