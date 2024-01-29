const admin = require("firebase-admin");

const sendNotification = (token) => {
    const message = { token };

    admin.messaging().send(message)
        .catch((error) => {
            console.error('Error sending message:', error);
        });
}

module.exports = sendNotification;