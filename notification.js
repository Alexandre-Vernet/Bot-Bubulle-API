const admin = require("firebase-admin");

const sendNotification = () => {
    const message = {
        notification: {
            title: 'Title',
            body: 'Body'
        },
        token: ''
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

module.exports = { sendNotification };