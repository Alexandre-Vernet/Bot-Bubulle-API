const express = require('express');
const app = express();
const port = process.env.PORT || 80;
require('dotenv').config();
const schedule = require("node-schedule");
const {sendNotification} = require("./notification");
const admin = require("firebase-admin");

app.use(express.json());

const serviceAccount = require("./bot-bubulle-fc5f2-firebase-adminsdk-agbtd-fe37e65442.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.listen(port, () => {
    console.log(`Bot-Bubulle is running on port: ${port}`);
    sendNotification();

    // const job = '0 20 * * *';   // Every day at 20:00
    const job = '* * * * *';
    schedule.scheduleJob(job, async () => {
        // sendNotification();
    });
});