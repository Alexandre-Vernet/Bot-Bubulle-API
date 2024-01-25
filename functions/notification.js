const admin = require("firebase-admin");

const sendNotification = (token) => {
    const message = {
        notification: {
            title: 'Dring Dring 🕰️💊 !'
        },
        android: {
            notification: {
                imageUrl: 'https://github.com/Alexandre-Vernet/Bot-Bubulle-API/blob/main/assets/images/icon.png?raw=true'
            }
        },
        token
    };

    admin.messaging().send(message)
        .then(e => console.log(e))
        .catch((error) => {
            console.error('Error sending message:', error);
        });
}

module.exports = sendNotification;