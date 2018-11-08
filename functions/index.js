const fs = require('fs')
const path = require('path')
const os = require('os')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const csvtojson = require('csvtojson')
const Busboy = require('busboy')

admin.initializeApp(functions.config().firebase)

exports.uploadContactsCSV = functions.https.onRequest((req, res) => {
  if (req.method === 'POST') {
    const busboy = new Busboy({ headers: req.headers })
    const tmpdir = os.tmpdir()

    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = {}

    let fileWrites = []

    // This code will process each file uploaded.
    busboy.on('file', (fieldname, file, filename) => {
      // Note: os.tmpdir() points to an in-memory file system on GCF
      // Thus, any files in it must fit in the instance's memory.
      console.log(`Processed file ${filename}`)
      const filepath = path.join(tmpdir, filename)
      uploads[fieldname] = filepath

      const writeStream = fs.createWriteStream(filepath)
      file.pipe(writeStream)

      // File was processed by Busboy; wait for it to be written to disk.
      const promise = new Promise((resolve, reject) => {
        file.on('end', () => {
          writeStream.end()
        })
        writeStream.on('finish', resolve)
        writeStream.on('error', reject)
      })
      fileWrites.push(promise)
    })

    // Triggered once all uploaded files are processed by Busboy.
    // We still need to wait for the disk writes (saves) to complete.
    busboy.on('finish', () => {
      Promise.all(fileWrites).then(() => {
        csvtojson()
          .fromStream(fs.createReadStream(uploads['contacts']))
          .then(data => {
            const db = admin.firestore()
            // create contacts or update exisiting
            let docRef
            db.collection('contacts')
              .doc(data[0].id)
              .get()
              .then(snap => {
                if (snap.exists) {
                  docRef = snap
                } else {
                  docRef = db
                    .collection('contacts')
                    .where('firstName', '==', data[0].firstName)
                    .where('birthday', '==', new Date(data[0].birthday))
                }
              })
            console.log(`${data.length} uploaded`)
            // check if id exists check if first name, birthday, and gender are a match
            if (false) {
              // if found update with latest information
            } else {
              // if not found create contact
              // first, find out
              db.collection('contacts').add(docRef)
            }
          })
        // delete files
        for (const name in uploads) {
          const file = uploads[name]
          fs.unlinkSync(file)
        }
        res.send()
      })
    })

    busboy.end(req.rawBody)
  } else {
    // Return a "method not allowed" error
    res.status(405).end()
  }
})
