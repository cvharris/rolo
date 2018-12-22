import firebase, { db } from 'config/firebase'
import Papa from 'papaparse'

export default (file, onStep, onComplete, onError) => {
  // Build the list of uploaded contacts
  const contacts = []

  const createNewContact = (contact, docRef) => {
    docRef = db.collection('contacts').doc()
    contact.clientId = contact.id
    contact.id = docRef.id
    return contact
  }

  const updateExistingContact = (contact, foundContact) => {
    contact.clientId = contact.id
    contact.id = foundContact.id
    return Object.assign(foundContact, contact)
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    step: async (row, parser) => {
      if (row.errors.length) {
        parser.abort()
        console.error(row.errors)
      }

      // Pause the parser to wait for async functions to run
      parser.pause()
      const contact = row.data[0]
      // Check if contact already exists
      let docRef = db.collection('contacts').doc(contact.id)
      try {
        let foundContact = await docRef.get()
        if (foundContact.exists) {
          // update it
          contacts.push(updateExistingContact(contact, foundContact))
        } else {
          // docRef = db
          //   .collection('contacts')
          //   .where('firstName', '==', contact.firstName)
          //   .where('birthday', '==', contact.birthday)
          // const results = await docRef.get()
          // if (results.docs.length > 0) {
          //   // update it
          //   foundContact = results.docs[0]
          //   contact.clientId = contact.id
          //   contact.id = foundContact.id
          //   contacts.push(Object.assign(foundContact, contact))
          // } else {
          // else create new id for it
          // }
          contacts.push(createNewContact(contact, docRef))
        }
      } catch (e) {
        contacts.push(createNewContact(contact, docRef))
      }
      onStep(row.meta.cursor)
      parser.resume()
    },
    transform: (val, col) => {
      switch (col) {
        case 'firstName':
        case 'lastName':
        case 'middleName':
        case 'maidenName':
        case 'suffix':
        case 'prefix':
        case 'email':
        case 'phoneNumber':
        case 'gender':
          return val ? val.trim() : ''
        case 'parents':
        case 'children':
          return val ? val.split(',') : []
        case 'spouse':
          return val ? val : null
        case 'dod':
        case 'birthday':
          return val
            ? firebase.firestore.Timestamp.fromDate(new Date(val))
                .toDate()
                .toDateString()
            : null
        default:
          return val
      }
    },
    complete: () => {
      onComplete(contacts)
    },
    error: (err, file, inputEl, reason) => {
      console.error('err in the upload')
      onError(err, reason)
    }
  })
}
