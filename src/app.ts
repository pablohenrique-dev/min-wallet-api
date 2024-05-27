import express from "express";

export const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  return res.send("Hello world!");
});
