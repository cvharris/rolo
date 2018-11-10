const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.uploadContacts = functions.https.onRequest((req, res) => {
  if (req.method === 'POST') {
  }
})
