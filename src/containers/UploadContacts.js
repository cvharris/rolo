import ContactsList from 'components/ContactsList'
import firebase from 'config/firebase'
import Papa from 'papaparse'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class UploadContacts extends Component {
  state = {
    fileSize: 1,
    uploading: false,
    uploadProgress: 0,
    uploadedContacts: []
  }

  uploadContacts = async () => {
    await Promise.all(
      this.state.uploadedContacts.map(contact => {
        const {
          firstName,
          lastName,
          gender,
          birthday,
          email,
          phoneNumber,
          parents,
          children,
          spouse
        } = contact
        return firebase
          .firestore()
          .collection('contacts')
          .doc(contact.id)
          .set({
            firstName,
            lastName,
            gender,
            birthday,
            email,
            phoneNumber,
            parents,
            children,
            spouse
          })
      })
    )
  }

  handleUploadedSpreadsheet = file => {
    const contacts = []

    this.setState({
      ...this.state,
      uploading: true,
      fileSize: file.size
    })

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      step: async (row, parser) => {
        // TODO: check for errors

        parser.pause()
        const contact = row.data[0]
        // Check if contact already exists
        let docRef = firebase
          .firestore()
          .collection('contacts')
          .doc(contact.id)
        let foundContact = await docRef.get()
        if (foundContact.exists) {
          // update it
          contact.clientId = contact.id
          contact.id = foundContact.id
        } else {
          docRef = firebase
            .firestore()
            .collection('contacts')
            .where('firstName', '==', contact.firstName)
            .where('birthday', '==', contact.birthday)
          const results = await docRef.get()
          if (results.docs.length > 0) {
            // update it
            foundContact = results.docs[0]
            contact.clientId = contact.id
            contact.id = foundContact.id
          } else {
            // else create new id for it
            docRef = firebase
              .firestore()
              .collection('contacts')
              .doc()
            contact.clientId = contact.id
            contact.id = docRef.id
          }
        }
        contacts.push(contact)
        this.setState({
          ...this.state,
          uploadProgress: this.state.uploadProgress + row.meta.cursor
        })
        parser.resume()
        // parser.abort()
      },
      transform: (val, col) => {
        switch (col) {
          case 'firstName':
          case 'lastName':
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
              : null
          default:
            return val
        }
      },
      complete: () => {
        // fix references
        contacts.forEach(contact => {
          contact.children = contact.children.map(child => {
            const childId = child.match(/(\d+)$/)
            const childRef = contacts.find(con => con.clientId === childId[1])
            return childRef
              ? firebase.firestore().doc(`/contacts/${childRef.id}`)
              : child
          })
          contact.parents = contact.parents.map(parent => {
            const parentId = parent.match(/(\d+)$/)
            const parentRef = contacts.find(con => con.clientId === parentId[1])
            return parentRef
              ? firebase.firestore().doc(`/contacts/${parentRef.id}`)
              : parent
          })
          if (contact.spouse) {
            const spouseRef = contacts.find(
              con => con.clientId === contact.spouse.match(/(\d+)$/)[1]
            )
            contact.spouse = spouseRef
              ? firebase.firestore().doc(`/contacts/${spouseRef.id}`)
              : contact.spouse
          }
        })
        this.setState({
          uploadProgress: 0,
          fileSize: 1,
          uploading: false,
          uploadedContacts: contacts
        })
      }
    })
  }

  render() {
    const { uploadedContacts, uploadProgress, uploading, fileSize } = this.state

    return (
      <div>
        {uploading && (
          <div className="bg-moon-gray br-pill h1 overflow-y-hidden">
            <div
              className="bg-blue br-pill h1 shadow-1"
              style={{
                width: `${Math.round((uploadProgress / fileSize) * 100)}%`
              }}
            />
          </div>
        )}
        <input
          type="file"
          name=""
          accept=".csv"
          onChange={e => this.handleUploadedSpreadsheet(e.target.files[0])}
        />
        {uploadedContacts.length > 0 && (
          <div>
            <div onClick={this.uploadContacts}>Submit</div>
            <ContactsList contacts={uploadedContacts} />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({}),
    null
  )(UploadContacts)
)
