import firebase, { db } from 'config/firebase'
import consola from 'consola'
import {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil
} from 'google-libphonenumber'
import Papa from 'papaparse'

export default (file, onStep, onComplete, onError) => {
  // Build the list of uploaded contacts
  const contacts = []
  const phoneUtil = PhoneNumberUtil.getInstance()

  const createNewContact = (contact, docRef) => {
    docRef = db.collection('contacts').doc()
    return {
      ...contact,
      uploadedBy: firebase.auth().currentUser.uid,
      clientId: contact.id,
      id: docRef.id
    }
  }

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    step: async (row, parser) => {
      if (row.errors.length) {
        parser.abort()
        consola.error(row.errors)
      }
      const contact = row.data[0]
      // Check if contact already exists
      let docRef = db.collection('contacts').doc(contact.id)
      contacts.push(createNewContact(contact, docRef))
      onStep(row.meta.cursor)
    },
    transform: (val, col) => {
      switch (col) {
        case 'parents':
        case 'children':
          return val ? val.split(',') : []
        case 'spouse':
          return val ? val : null
        case 'phoneNumber':
          if (val) {
            const parsedNumber = phoneUtil.parse(val, 'US')
            if (phoneUtil.isValidNumber(parsedNumber)) {
              return phoneUtil.format(parsedNumber, PNF.E164)
            } else {
              return val
            }
          }
          return ''
        case 'dod':
        case 'birthday':
          return val
            ? firebase.firestore.Timestamp.fromDate(new Date(val))
            : null
        default:
          return val ? val.trim() : ''
      }
    },
    complete: () => {
      onComplete(contacts)
    },
    error: (err, file, inputEl, reason) => {
      consola.error('err in the upload')
      onError(err, reason)
    }
  })
}
