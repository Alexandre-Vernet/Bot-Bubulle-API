import admin from "firebase-admin";

const sendNotification = (token: string) => {
    const message = { token };

    admin.messaging().send(message)
        .catch((error) => {
            console.error('Error sending message:', error);
        });
}

export default sendNotification;