const schedule = require("node-schedule");
const sendNotification = require("./notification");
const {getFirestore} = require("firebase-admin/firestore");

const cron = () => {
    const serviceAccount = require("../bot-bubulle-fc5f2-firebase-adminsdk-agbtd-fe37e65442.json");
    const admin = require("firebase-admin");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();

    db.collection('notifications')
        .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach((change) => {
                const {token, job} = change.doc.data();
                schedule.scheduleJob(job, () => {
                    sendNotification(token);
                });
            });
        });
}

module.exports = cron;