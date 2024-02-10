import packageJSON from "../package.json";

import express from "express";

import cron from "./cron";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 80;

dotenv.config();
app.use(express.json());

cron();

app.listen(port, () => {
    console.log(`${packageJSON.name} running on port ${port}`);
});