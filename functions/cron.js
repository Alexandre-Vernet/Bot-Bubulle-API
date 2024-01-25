const schedule = require("node-schedule");
const sendNotification = require("./notification");
const {getFirestore} = require("firebase-admin/firestore");
const admin = require("firebase-admin");

const cron = () => {
    const serviceAccount = {
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_AUTH_URI,
        "token_uri": process.env.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
        "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
    }

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