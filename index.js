const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./service-account-file.json")),
  databaseURL: "https://....firebaseio.com",
});

admin.messaging().send({
  token: "device token",
  data: {
    hello: "world",
  },
  // Set Android priority to "high"
  android: {
    priority: "high",
  },
  // Add APNS (Apple) config
  apns: {
    payload: {
      aps: {
        contentAvailable: true,
      },
    },
    headers: {
      "apns-push-type": "background",
      "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
      "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
    },
  },
});