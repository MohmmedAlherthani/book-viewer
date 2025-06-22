// functions/lib/firebase.js
const admin = require("firebase-admin");

// Initialize Firebase Admin using service account env (set GOOGLE_APPLICATION_CREDENTIALS)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: "light-for-gaza.firebasestorage.app",
  });
}

// Export the default storage bucket
module.exports = admin.storage().bucket();
