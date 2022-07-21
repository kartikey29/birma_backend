var admin = require("firebase-admin");

var serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://birma-d7d3c-default-rtdb.asia-southeast1.firebasedatabase.app",
});

module.exports.admin = admin;
