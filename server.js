const express = require('express');
const app = express();
const port = process.env.PORT || 80;
require('dotenv').config();
const cron = require('./functions/cron');

app.use(express.json());

cron();

app.listen(port, () => {
    console.log(`Bot-Bubulle is running on port ${port}`);
});